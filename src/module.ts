import { addPlugin, defineNuxtModule, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
    meta: {
        name: "vue-drag-scroller",
    },
    setup(options) {
        const resolver = createResolver(import.meta.url);
        addPlugin(resolver.resolve("./runtime/plugin"));
    },
});
