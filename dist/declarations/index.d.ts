import type { App, DirectiveBinding } from 'vue';
interface ICustomBinding extends DirectiveBinding {
    value: {
        startScroll?: (e: MouseEvent) => void;
        endScroll?: (e: MouseEvent) => void;
        onScrolling?: (e: MouseEvent) => void;
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
export declare const VueDragScrollerModule: {
    directive: {
        mounted(elem: HTMLElement, binding: ICustomBinding): void;
        updated(elem: HTMLElement, binding: ICustomBinding): void;
        unmounted(elem: HTMLElement): void;
    };
    install(app: App): void;
};
export { statefullDirective as dragScroller };
export { statefullDirective as vDragScroller };
export { VueDragScrollerPlugin };
export default VueDragScrollerPlugin;
declare module 'vue' {
    interface ComponentCustomProperties {
        vDragScroller: DragScrollerOptions;
    }
}
