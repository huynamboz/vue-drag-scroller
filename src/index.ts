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
  // Helper to detect mobile/touch devices
  const isTouchDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
      // Additional check for mobile user agents
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    )
  }
  return {
    mounted(elem: HTMLElement, binding: ICustomBinding) {
      let isDrag = false
      const { onlyX, onlyY, disablechild } = binding.modifiers

      const OptionBinding = binding.value ?? {}

      // Skip initialization on mobile/touch devices unless explicitly enabled
      if (isTouchDevice() && !OptionBinding.enableOnMobile) {
        // Let native touch scrolling handle it
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

      const dragStart = (e: MouseEvent): void => {
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

      const dragEnd = (e?: MouseEvent): void => {
        if (!isDrag) return
        elem.dispatchEvent(eventEnd)
        if (options.binding?.endScroll && typeof options.binding?.endScroll === 'function') {
          options.binding.endScroll(e!)
        }
        isDrag = false
      }

      const drag = (ev: MouseEvent): any => {
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

      function preventSelection(ev: DragEvent | MouseEvent) {
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
      elem.addEventListener('mousedown', dragStart)
      elem.addEventListener('dragstart', preventSelection)
      elem.addEventListener('mouseleave', dragEnd)
      window.addEventListener('mouseup', dragEnd)
      window.addEventListener('pointerup', dragEnd)
      window.addEventListener('mousemove', drag)
      window.addEventListener('blur', resetDrag)
      // Reset drag state when a native drag starts (for compatibility with draggable libraries)
      elem.addEventListener('dragstart', resetDrag)
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
      elem.removeEventListener('mousedown', dragStart)
      elem.removeEventListener('dragstart', preventSelection)
      elem.removeEventListener('mouseleave', dragEnd)
      elem.removeEventListener('dragstart', resetDrag)
      window.removeEventListener('mouseup', dragEnd)
      window.removeEventListener('mousemove', drag)
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

// Module export - can be used without installing the plugin
export const VueDragScrollerModule = {
  directive: statefullDirective,
  install(app: App) {
    app.directive('drag-scroller', statefullDirective)
  }
}

export { statefullDirective as dragScroller }
export { statefullDirective as vDragScroller }
export { VueDragScrollerPlugin }
export default VueDragScrollerPlugin

// Augment Vue types for directive autocomplete
declare module 'vue' {
  export interface ComponentCustomProperties {
    vDragScroller: DragScrollerOptions
  }
}
