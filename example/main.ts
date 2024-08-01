import './assets/main.css'
import { createApp } from 'vue'
import VueDragScroller from "../src"
import App from './App.vue'

const app = createApp(App)
app.use(VueDragScroller)
app.mount('#app')
