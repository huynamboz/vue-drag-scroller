import { App, DirectiveBinding } from 'vue';
interface ICustomBinding extends DirectiveBinding {
    value: {
        startScroll?: (e: MouseEvent) => void;
        endScroll?: (e: MouseEvent) => void;
        onScrolling?: (e: MouseEvent) => void;
    };
    modifiers: {
        disablechild?: boolean;
        onlyX?: boolean;
        onlyY?: boolean;
    };
}
declare const statefullDirective: {
    mounted(elem: HTMLElement, binding: ICustomBinding): void;
    unmounted(elem: HTMLElement): void;
};
declare const VueDragScroller: {
    install(app: App): void;
};
export { statefullDirective as dragScroller };
export default VueDragScroller;
