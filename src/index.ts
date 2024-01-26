import { App, DirectiveBinding } from 'vue'
const CHILD_DISABLE = 'drag-scroller-disable'
const CHILD_ENABLE = 'drag-scroller-enable'
const HIDE_SCROLLBAR = 'hideScrollbar'
interface ICustomBinding extends DirectiveBinding {
  value: {
    startScroll?: (e: MouseEvent) => void
    endScroll?: (e: MouseEvent) => void
    onScrolling?: (e: MouseEvent) => void
    speed?: number
    hideScrollbar?: boolean
  }
  modifiers: {
    disablechild?: boolean
    onlyX?: boolean
    onlyY?: boolean
  }
}

const statefullDirective = (() => {
  const state = new WeakMap()
  return {
    mounted(elem: HTMLElement, binding: ICustomBinding) {
      let isDrag = false
      const { onlyX, onlyY, disablechild } = binding.modifiers

      const OptionBinding = binding.value ?? {}

      if (OptionBinding.hideScrollbar === true) {
        elem.style.overflow = 'hidden'
      }

      const checkTag = (el: HTMLElement): boolean => {
        if (disablechild) {
          return el === elem
        }

        // check if element is child of elem and disabled
        while (el && el.parentNode) {
          if (el && el?.hasAttribute(CHILD_DISABLE)) {
            return false
          } else if (el === elem) {
            return true
          }
          el = el.parentNode as HTMLElement
        }
        return false
      }

      const dragStart = (e: MouseEvent): void => {
        isDrag = checkTag(e.target as HTMLElement)
        if (
          isDrag &&
          OptionBinding?.startScroll &&
          typeof OptionBinding?.startScroll === 'function'
        ) {
          OptionBinding.startScroll(e)
        }
      }

      const dragEnd = (e: MouseEvent): void => {
        if (isDrag && OptionBinding?.endScroll && typeof OptionBinding?.endScroll === 'function') {
          OptionBinding.endScroll(e)
        }
        isDrag = false
      }

      const drag = (ev: MouseEvent): any => {
        if (!isDrag) return false

        if (OptionBinding?.onScrolling && typeof OptionBinding?.onScrolling === 'function') {
          OptionBinding.onScrolling(ev)
        }
        // prevent text selection when mouse move
        if (ev.stopPropagation) ev.stopPropagation()
        if (ev.preventDefault) ev.preventDefault()
        ev.cancelBubble = true
        ev.returnValue = false
        const speed = OptionBinding?.speed || 1
        if (onlyX) {
          elem.scrollLeft -= ev.movementX * speed
        } else if (onlyY) {
          elem.scrollTop -= ev.movementY * speed
        } else {
          elem.scrollLeft -= ev.movementX * speed
          elem.scrollTop -= ev.movementY * speed
        }
      }

      state.set(elem, { dragStart, dragEnd, drag })
      elem.addEventListener('pointerdown', dragStart)
      addEventListener('pointerup', dragEnd)
      addEventListener('pointermove', drag)
    },
    unmounted(elem: HTMLElement) {
      const { dragStart, dragEnd, drag } = state.get(elem)
      elem.removeEventListener('pointerdown', dragStart)
      removeEventListener('pointerup', dragEnd)
      removeEventListener('pointermove', drag)
    }
  }
})()

// export directive as plugin vue
const VueDragScroller = {
  install(app: App) {
    app.directive('drag-scroller', statefullDirective)
  }
}
export { statefullDirective as dragScroller }
export default VueDragScroller
