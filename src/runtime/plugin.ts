import { defineNuxtPlugin } from '#app'
import VueDragScroller from '../index'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDragScroller)
})