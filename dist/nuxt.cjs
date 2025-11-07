"use strict";const e=require("@nuxt/kit"),r=e.defineNuxtModule({meta:{name:"vue-drag-scroller",configKey:"vueDragScroller",compatibility:{nuxt:"^3.0.0"}},defaults:{},setup(){e.addImports({name:"dragScroller",as:"dragScroller",from:"vue-drag-scroller/directive"}),e.addPluginTemplate({filename:"vue-drag-scroller-plugin.mjs",getContents:()=>`
        import { defineNuxtPlugin } from '#app'
        import { dragScroller } from '#imports'

        export default defineNuxtPlugin(({ vueApp }) => {
          vueApp.directive('drag-scroller', dragScroller)
        })
      `})}});module.exports=r;
