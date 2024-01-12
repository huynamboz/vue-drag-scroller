import { App, DirectiveBinding } from 'vue'
// type for bind from vue

interface ICustomBinding extends DirectiveBinding {
  value: {
    startScroll?: (e: MouseEvent) => void;
    endScroll?: (e: MouseEvent) => void;
  }
}

const statefullDirective = (() => {
  const state = new WeakMap()
  return {
    mounted(elem: HTMLElement, binding: ICustomBinding) {
      let isDrag = false
  
      const checkTag = (el: HTMLElement): boolean => {
        if (el && el?.hasAttribute('drag-scroller-disable')) {
          return false
        }
        while (el && el.parentNode) {
          el = el.parentNode as HTMLElement
          if (el?.hasAttribute('drag-scroller-disable')) {
            return false
          } else if (el === elem) {
            return true
          }
        }
        return true
      }
  
      const dragStart = (e: MouseEvent): void => {
        console.log('dragStart', e, isDrag)
        isDrag = checkTag(e.target as HTMLElement)
        if (isDrag && binding.value?.startScroll && typeof binding.value.startScroll === 'function') {
          binding.value.startScroll(e)
        }
      }
  
      const dragEnd = (e: MouseEvent): void => {
        console.log('dragEnd')
        if (isDrag && binding.value?.endScroll && typeof binding.value.endScroll === 'function') {
          binding.value.endScroll(e)
        }
        isDrag = false
      }
      const drag = (ev: MouseEvent): any => {
        if (!isDrag) return false
        // prevent text selection when mouse move
        if (ev.stopPropagation) ev.stopPropagation()
        if (ev.preventDefault) ev.preventDefault()
        ev.cancelBubble = true
        ev.returnValue = false
        // return isDrag && (elem.scrollLeft -= ev.movementX) && (elem.scrollTop -= ev.movementY)
        if (isDrag) {
          elem.scrollLeft -= ev.movementX
          elem.scrollTop -= ev.movementY
        }
      }
      // save function to remove listener
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
    },
  }
})()

// export directive as plugin vue
const VueDragScroller = {
  install(app: App) {
    app.directive('drag-scroller', statefullDirective)
  },
}
export { statefullDirective as dragScroller }
export default VueDragScroller