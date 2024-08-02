# How to Install 🔖

## NPM
::: code-group

```bash [npm]
npm install vue-drag-scroller
```


```bash [yarn]
yarn add vue-drag-scroller
```

``` bash [pnpm]
pnpm add vue-drag-scroller
```

:::

### CDN

You can also include Vue Drag Scroller via CDN by adding the following script tag to your HTML file:

```html
<script src="https://unpkg.com/vue-drag-scroller"></script>
```

## Import

### Install to Vue 3

- To use Vue Drag Scroller <b>global</b> in your Vue 3 application, import it as a plugin in your main.js file:

::: code-group

```javascript [main.js]
import { createApp } from 'vue'
import App from './App.vue'
import VueDragScroller from 'vue-drag-scroller'

const app = createApp(App)
app.use(VueDragScroller)
app.mount('#app')
```

```vue [App.vue]
<template>
	<div v-drag-scroller>
	</div>
</template>
```

:::

- To use Vue Drag Scroller <b>locally</b> in your Vue 3 application, import it as a component in your single file component:

::: code-group

```vue [App.vue]
<script>
    import { dragScroller as vDragScroller } from  "vue-drag-scroller"
</script>

<template>
    <div v-drag-scroller>
    </div>
</template>
```

:::

### Install to Nuxt.js (Only for Nuxt 3)

To use Vue Drag Scroller in your Nuxt.js application, import it as a plugin in your nuxt.config.js file:

::: code-group

```javascript [plugins/vue-drag-scroller.js]
import VueDragScroller from 'vue-drag-scroller'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDragScroller)
})
```

```javascript [nuxt.config.js]
export default defineNuxtConfig({
  plugins: ['~/plugins/vue-drag-scroller.ts'],
})
```

```vue [App.vue]
<template>
  <div v-drag-scroller>
  </div>
</template>
```

:::

