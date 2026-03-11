import type { DragScrollerOptions, DragScrollerModifiers } from './index'

declare module 'vue-drag-scroller' {
  import VueDragScrollerPlugin from './index.ts'
  import { dragScroller, vDragScroller, VueDragScroller } from './index.ts'

  export { dragScroller, vDragScroller, VueDragScroller }
  export type { DragScrollerOptions, DragScrollerModifiers }
  export default VueDragScrollerPlugin
}
