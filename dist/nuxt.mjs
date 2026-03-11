import { defineNuxtModule as e, addImports as r, addPluginTemplate as l } from "@nuxt/kit";
const o = e({
  meta: {
    name: "vue-drag-scroller",
    configKey: "vueDragScroller",
    compatibility: {
      nuxt: "^3.0.0"
    }
  },
  defaults: {},
  setup() {
    r({
      name: "dragScroller",
      as: "dragScroller",
      from: "vue-drag-scroller/directive"
    }), l({
      filename: "vue-drag-scroller-plugin.mjs",
      getContents: () => `
        import { defineNuxtPlugin } from '#app'
        import { dragScroller } from '#imports'

        export default defineNuxtPlugin(({ vueApp }) => {
          vueApp.directive('drag-scroller', dragScroller)
        })
      `
    });
  }
});
export {
  o as default
};
