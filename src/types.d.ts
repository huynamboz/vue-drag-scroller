import type { DragScrollerOptions, DragScrollerModifiers } from './index'

declare module 'vue-drag-scroller' {
  import VueDragScrollerPlugin from './index.ts'
  import { dragScroller, vDragScroller, VueDragScrollerModule } from './index.ts'

  export { dragScroller, vDragScroller, VueDragScrollerModule }
  export type { DragScrollerOptions, DragScrollerModifiers }
  export default VueDragScrollerPlugin
}
