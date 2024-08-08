import type { App, DirectiveBinding } from 'vue'
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
    reverseDirection?: boolean
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
      
      // custom event
      const eventStart = new Event('scrollStart', { bubbles: true })
      const eventMoving = new Event('scrollMoving', { bubbles: true })
      const eventEnd = new Event('scrollEnd', { bubbles: true })
      
      // hide scrollbar
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
          elem.dispatchEvent(eventStart)
          if (
          isDrag &&
          OptionBinding?.startScroll &&
          typeof OptionBinding?.startScroll === 'function'
        ) {
          OptionBinding.startScroll(e)
        }
      }

      const dragEnd = (e: MouseEvent): void => {
          elem.dispatchEvent(eventEnd)
          if (isDrag && OptionBinding?.endScroll && typeof OptionBinding?.endScroll === 'function') {
          OptionBinding.endScroll(e)
        }
        isDrag = false
      }

      const drag = (ev: MouseEvent): any => {
        if (!isDrag) return false

          elem.dispatchEvent(eventMoving)
          if (OptionBinding?.onScrolling && typeof OptionBinding?.onScrolling === 'function') {
          OptionBinding.onScrolling(ev)
        }

        
        const speed = OptionBinding?.speed || 1
        const scrollLeftDelta = OptionBinding.reverseDirection ? ev.movementX * speed : -ev.movementX * speed;
        const scrollTopDelta = OptionBinding.reverseDirection ? ev.movementY * speed : -ev.movementY * speed;

        if (onlyX) {
          elem.scrollLeft += scrollLeftDelta;
        } else if (onlyY) {
          elem.scrollTop += scrollTopDelta;
        } else {
          elem.scrollLeft += scrollLeftDelta;
          elem.scrollTop += scrollTopDelta;
        }

        preventSelection(ev)
        return false
      }

      function preventSelection(ev: DragEvent | MouseEvent) {
        // prevent text selection when mouse move
        // if element is image then prevent default
        if (ev?.target instanceof HTMLImageElement) {
          if (ev.preventDefault) ev.preventDefault()
        }
        window.getSelection()?.removeAllRanges();
      }

      state.set(elem, { dragStart, dragEnd, drag, preventSelection })
      elem.addEventListener('pointerdown', dragStart)
      elem.addEventListener('dragstart', preventSelection)
      addEventListener('pointerup', dragEnd)
      addEventListener('pointermove', drag)
    },
    unmounted(elem: HTMLElement) {
      const { dragStart, dragEnd, drag, preventSelection } = state.get(elem)
      elem.removeEventListener('pointerdown', dragStart)
      elem.removeEventListener('dragstart', preventSelection)
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
export { statefullDirective as vDragScroller }
export default VueDragScroller
