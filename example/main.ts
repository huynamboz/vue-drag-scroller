import './assets/main.css'
import { createApp } from 'vue'
import VueDragScroller from "../node_modules/vue-drag-scroller"
import App from './App.vue'

const app = createApp(App)
app.use(VueDragScroller)
app.mount('#app')
