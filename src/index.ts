import { App, DirectiveBinding } from 'vue'
const CHILD_DISABLE = 'drag-scroller-disable'
const CHILD_ENABLE = 'drag-scroller-enable'

interface ICustomBinding extends DirectiveBinding {
  value: {
    startScroll?: (e: MouseEvent) => void
    endScroll?: (e: MouseEvent) => void
    onScrolling?: (e: MouseEvent) => void
    speed?: number
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
          binding.value?.startScroll &&
          typeof binding.value.startScroll === 'function'
        ) {
          binding.value.startScroll(e)
        }
      }

      const dragEnd = (e: MouseEvent): void => {
        if (isDrag && binding.value?.endScroll && typeof binding.value.endScroll === 'function') {
          binding.value.endScroll(e)
        }
        isDrag = false
      }

      const drag = (ev: MouseEvent): any => {
        if (!isDrag) return false

        if (binding.value.onScrolling && typeof binding.value.onScrolling === 'function') {
          binding.value.onScrolling(ev)
        }
        // prevent text selection when mouse move
        if (ev.stopPropagation) ev.stopPropagation()
        if (ev.preventDefault) ev.preventDefault()
        ev.cancelBubble = true
        ev.returnValue = false
        const speed = binding.value?.speed || 1
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
