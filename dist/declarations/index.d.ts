import type { App, DirectiveBinding } from 'vue';
interface ICustomBinding extends DirectiveBinding {
    value: {
        startScroll?: (e: PointerEvent) => void;
        endScroll?: (e?: PointerEvent) => void;
        onScrolling?: (e: PointerEvent) => void;
        speed?: number;
        hideScrollbar?: boolean;
        reverseDirection?: boolean;
        enableOnMobile?: boolean;
        enabled?: boolean;
    };
    modifiers: {
        disablechild?: boolean;
        onlyX?: boolean;
        onlyY?: boolean;
    };
}
declare const statefullDirective: {
    mounted(elem: HTMLElement, binding: ICustomBinding): void;
    updated(elem: HTMLElement, binding: ICustomBinding): void;
    unmounted(elem: HTMLElement): void;
};
export type DragScrollerOptions = ICustomBinding['value'];
export type DragScrollerModifiers = ICustomBinding['modifiers'];
declare const VueDragScrollerPlugin: {
    install(app: App): void;
};
export { statefullDirective as dragScroller };
export { statefullDirective as vDragScroller };
export { VueDragScrollerPlugin };
export declare const VueDragScroller: {
    install(app: App): void;
};
export default VueDragScrollerPlugin;
declare module 'vue' {
    interface ComponentCustomProperties {
        vDragScroller: DragScrollerOptions;
    }
}
