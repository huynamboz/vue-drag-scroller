import type { App, DirectiveBinding } from 'vue'
const CHILD_DISABLE = 'drag-scroller-disable'
const CHILD_ENABLE = 'drag-scroller-enable'
const HIDE_SCROLLBAR = 'hideScrollbar'
interface ICustomBinding extends DirectiveBinding {
  value: {
    startScroll?: (e: PointerEvent) => void
    endScroll?: (e?: PointerEvent) => void
    onScrolling?: (e: PointerEvent) => void
    speed?: number
    hideScrollbar?: boolean
    reverseDirection?: boolean
    enableOnMobile?: boolean
    enabled?: boolean
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
      // SSR-safe mobile/touch detection — only runs in mounted (client-side)
      const isTouchDevice = () => {
        return (
          navigator.maxTouchPoints > 0 ||
          (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
        )
      }

      let isDrag = false
      const { onlyX, onlyY, disablechild } = binding.modifiers

      const OptionBinding = binding.value ?? {}

      // Skip initialization on mobile/touch devices unless explicitly enabled
      if (isTouchDevice() && !OptionBinding.enableOnMobile) {
        return
      }

      // custom event
      const eventStart = new Event('scrollStart', { bubbles: true })
      const eventMoving = new Event('scrollMoving', { bubbles: true })
      const eventEnd = new Event('scrollEnd', { bubbles: true })
      // Store reactive options reference
      const options = {
        binding: binding.value ?? {}
      }

      // hide scrollbar
      if (options.binding.hideScrollbar === true) {
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

      const dragStart = (e: PointerEvent): void => {
        isDrag = checkTag(e.target as HTMLElement)
        elem.dispatchEvent(eventStart)
        if (
          isDrag &&
          options.binding?.startScroll &&
          typeof options.binding?.startScroll === 'function'
        ) {
          options.binding.startScroll(e)
        }
      }

      const dragEnd = (e?: PointerEvent): void => {
        if (!isDrag) return
        elem.dispatchEvent(eventEnd)
        if (options.binding?.endScroll && typeof options.binding?.endScroll === 'function') {
          options.binding.endScroll(e)
        }
        isDrag = false
      }

      const drag = (ev: PointerEvent): any => {
        // Check if drag scrolling is enabled (default to true if not specified)
        const isEnabled = options.binding.enabled !== false
        if (!isDrag || !isEnabled) return false

        elem.dispatchEvent(eventMoving)
        if (options.binding?.onScrolling && typeof options.binding?.onScrolling === 'function') {
          options.binding.onScrolling(ev)
        }

        const speed = options.binding?.speed || 1
        const scrollLeftDelta = options.binding.reverseDirection
          ? ev.movementX * speed
          : -ev.movementX * speed
        const scrollTopDelta = options.binding.reverseDirection
          ? ev.movementY * speed
          : -ev.movementY * speed

        if (onlyX) {
          elem.scrollLeft += scrollLeftDelta
        } else if (onlyY) {
          elem.scrollTop += scrollTopDelta
        } else {
          elem.scrollLeft += scrollLeftDelta
          elem.scrollTop += scrollTopDelta
        }

        preventSelection(ev)
        return false
      }

      function preventSelection(ev: DragEvent | PointerEvent) {
        // prevent text selection when mouse move
        // if element is image then prevent default
        if (ev?.target instanceof HTMLImageElement) {
          if (ev.preventDefault) ev.preventDefault()
        }
        window.getSelection()?.removeAllRanges()
      }

      // Additional safety to reset drag state
      const resetDrag = () => {
        isDrag = false
      }

      state.set(elem, { dragStart, dragEnd, drag, preventSelection, resetDrag, options })
      elem.addEventListener('pointerdown', dragStart)
      elem.addEventListener('dragstart', preventSelection)
      elem.addEventListener('dragstart', resetDrag)
      window.addEventListener('pointerup', dragEnd)
      window.addEventListener('pointermove', drag)
      window.addEventListener('blur', resetDrag)
    },
    updated(elem: HTMLElement, binding: ICustomBinding) {
      const handlers = state.get(elem)
      if (!handlers) return

      // Update the options reference so event handlers use new values
      handlers.options.binding = binding.value ?? {}

      // Update hideScrollbar style
      if (handlers.options.binding.hideScrollbar === true) {
        elem.style.overflow = 'hidden'
      } else if (handlers.options.binding.hideScrollbar === false) {
        elem.style.overflow = ''
      }
    },
    unmounted(elem: HTMLElement) {
      const handlers = state.get(elem)
      if (!handlers) return

      const { dragStart, dragEnd, drag, preventSelection, resetDrag } = handlers
      elem.removeEventListener('pointerdown', dragStart)
      elem.removeEventListener('dragstart', preventSelection)
      elem.removeEventListener('dragstart', resetDrag)
      window.removeEventListener('pointerup', dragEnd)
      window.removeEventListener('pointermove', drag)
      window.removeEventListener('blur', resetDrag)
      state.delete(elem)
    }
  }
})()

// Export types
export type DragScrollerOptions = ICustomBinding['value']
export type DragScrollerModifiers = ICustomBinding['modifiers']

// export directive as plugin vue
const VueDragScrollerPlugin = {
  install(app: App) {
    app.directive('drag-scroller', statefullDirective)
  }
}

export { statefullDirective as dragScroller }
export { statefullDirective as vDragScroller }
export { VueDragScrollerPlugin }
// Backward compatible alias
export const VueDragScroller = VueDragScrollerPlugin
export default VueDragScrollerPlugin

// Augment Vue types for directive autocomplete
declare module 'vue' {
  export interface ComponentCustomProperties {
    vDragScroller: DragScrollerOptions
  }
}
