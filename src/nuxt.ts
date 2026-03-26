import { defineNuxtModule, addPluginTemplate, addImports } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-drag-scroller',
    configKey: 'vueDragScroller',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  defaults: {},
  setup() {
    // Add auto-import for the directive using the /directive subpath
    addImports({
      name: 'dragScroller',
      as: 'dragScroller',
      from: 'vue-drag-scroller/directive'
    })

    // Add plugin template to register the directive
    addPluginTemplate({
      filename: 'vue-drag-scroller-plugin.mjs',
      getContents: () => `
        import { defineNuxtPlugin } from '#app'
        import { dragScroller } from '#imports'

        export default defineNuxtPlugin(({ vueApp }) => {
          vueApp.directive('drag-scroller', dragScroller)
        })
      `
    })
  }
})
