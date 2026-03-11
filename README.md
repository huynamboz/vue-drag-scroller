# Vue drag scroller ⚡️

![image](https://github.com/huynamboz/vue-drag-scroller/assets/38585889/57cc7cf2-1273-4416-8fcb-df8262a4af49)


<!-- tag -->
[![npm version](https://img.shields.io/npm/v/vue-drag-scroller.svg)](https://www.npmjs.com/package/vue-drag-scroller)
[![npm download](https://img.shields.io/npm/dm/vue-drag-scroller.svg)](https://www.npmjs.com/package/vue-drag-scroller)
[![npm license](https://img.shields.io/npm/l/vue-drag-scroller.svg)](https://www.npmjs.com/package/vue-drag-scroller)
<!-- endtag -->
This package help you drag to scroll easier🌟 <br>
<!-- add demo https://hinam.site/vue-drag-scroller/ -->
[Docs and demo](https://huynamboz.github.io/vue-drag-scroller/) <br> <br>







https://github.com/huynamboz/vue-drag-scroller/assets/38585889/20139bab-0004-4249-8826-70959f6dbc77



## How to install🔖
**NPM**

    npm install vue-drag-scroller
**YARN**

    yarn add vue-drag-scroller

## Install🔖

Use with vue 3: <br>
	**Register global:**
```javascript
//main.ts
import  { createApp }  from  'vue'
import VueDragScroller from  "vue-drag-scroller"
       
import App from  './App.vue'

const app  =  createApp(App)
app.use(VueDragScroller)
app.mount('#app')
```

``` html
//Example.vue
<template>
	<div v-drag-scroller>
	</div>
</template>
```
**Register local:**
```javascript
// Example.vue
<script>
    import { dragScroller as vDragScroller } from  "vue-drag-scroller"
</script>

<template>
    <div v-drag-scroller>
    </div>
</template>
```
**Register in Nuxt (v1.9.0+):**

Since version **1.9.0**, `vue-drag-scroller` ships with a built-in Nuxt module. Just add it to your `nuxt.config.ts` — no plugin file needed:

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['vue-drag-scroller/nuxt']
})
```

The `v-drag-scroller` directive is auto-registered globally. All options, modifiers, and events work the same as in Vue 3:

```html
<template>
    <!-- basic -->
    <div v-drag-scroller>...</div>

    <!-- with modifiers -->
    <div v-drag-scroller.onlyX>...</div>
    <div v-drag-scroller.onlyY>...</div>
    <div v-drag-scroller.disablechild>...</div>

    <!-- with options -->
    <div v-drag-scroller="{
        speed: 1,
        hideScrollbar: true,
        reverseDirection: false,
        enableOnMobile: false,
        enabled: true,
        startScroll: () => console.log('start'),
        endScroll: () => console.log('end'),
        onScrolling: () => console.log('scrolling'),
    }">...</div>

    <!-- event listeners -->
    <div v-drag-scroller
        @scrollStart="onScroll"
        @scrollEnd="onEndScroll"
        @scrollMoving="onScrolling"
    >...</div>
</template>
```

> **Note:** The Nuxt module is SSR-safe. Drag scroll listeners are only attached on the client side.

<details>
<summary><strong>Legacy: Using Plugin (before v1.9.0)</strong></summary>

```javascript
// plugins/vue-drag-scroller.js
import VueDragScroller from 'vue-drag-scroller'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDragScroller)
})
```
```javascript
// nuxt.config.js
export default defineNuxtConfig({
  plugins: ['~/plugins/vue-drag-scroller.ts'],
})
```
</details>


## Config🔖
### Options:
you can pass options to directive like this:
```javascript
<script setup>
import { ref } from 'vue'
const options = ref({
    startScroll: () => {
        console.log("start scroll");
    },
    endScroll: () => {
        console.log("end scroll");
    },
    onScrolling: () => {
        console.log("scrolling");
    },
    speed: 1, // default is 1
    reverseDirection: false, // default is false
    hideScrollbar: false, // default is false
    enableOnMobile: false, // default is false - enable drag scroll on mobile devices
    enabled: true, // default is true - enable/disable drag scroll dynamically
});
</script>

<template>
    <div v-drag-scroller="options">
    </div>
</template>
```
| Name | Description | Type | Default |
|--|--|--|--|
| startScroll | Trigger when start scroll | Function | null |
| endScroll | Trigger when end scroll | Function | null |
| onScrolling | Trigger when scrolling/dragging | Function | null |
| speed | Speed of scroll | Number | 1 |
| hideScrollbar | Hide scrollbar | Boolean | false |
| reverseDirection | Reverse direction of scroll | Boolean | false |
| enableOnMobile | Enable drag scroll on mobile/touch devices | Boolean | false |
| enabled | Enable/disable drag scroll dynamically | Boolean | true |
### Binding value:
you can pass binding value to directive like this:
```javascript
<template>
    <div v-drag-scroller.onlyX>
    </div>
</template>
```

```javascript
<template>
    <div v-drag-scroller.disablechild>
    </div>
</template>
```
<!-- | drag-scroller-disable | Disable drag scroll in particular child | Boolean | false | -->
| Name | Description | Type | Default |
|--|--|--|--|
| disablechild | Disable drag scroll in all child | Boolean | false |
| onlyX | Only scroll in X axis | Boolean | false |
| onlyY | Only scroll in Y axis | Boolean | false |

Priority: disablechild > drag-scroller-disable > onlyX > onlyY
### Events (use in options):
| Name | Description |
|--|--|
| startScroll | Trigger when start scroll|
| endScroll | Trigger when end scroll|
| onScrolling | Trigger when drag and move mouse|
#### Example
```javascript
<script setup>
const onScroll = (e) => {
  console.log("working",e);
};

const onEndScroll = (e) => {
  console.log("end scroll",e);
};

const options = {
    startScroll: onScroll,
    endScroll: onEndScroll,
};

</script>

// in component 
<template>
    <div v-drag-scroller="options">
    </div>
</template>
```
- ### Events Listener with v-on or @
#### Example with @
```javascript
<template>
    <div v-drag-scroller
      @scrollStart="onScroll"
      @scrollEnd="onEndScroll"
      @scrollMoving="onScrolling"
    >
    </div>
</template>
```
#### Example with v-on
```javascript
<template>
    <div v-drag-scroller
      v-on:scrollStart="onScroll"
      v-on:scrollEnd="onEndScroll"
      v-on:scrollMoving="onScrolling"
    >
    </div>
</template>
```
- ### Drag parent except all child
#### Example
```javascript
<template>
    <div v-drag-scroller.disablechild>
        <div class="child">
        </div>
        <div class="child">
        </div>
    </div>
</template>
```
- ### Drag parent except particular child
#### Example
```javascript
<template>
    <div v-drag-scroller>
        <div class="child" drag-scroller-disable> // disable drag scroll
        </div>
        <div class="child">
        </div>
    </div>
</template>
```
- ### Only scroll in X axis
#### Example
```javascript
<template>
    <div v-drag-scroller.onlyX>
    </div>
</template>
```
- ### Only scroll in Y axis
#### Example
```javascript
<template>
    <div v-drag-scroller.onlyY>
    </div>
</template>
```
- ### Hide scrollbar
#### Example
```javascript
<template>
    <div v-drag-scroller="{ hideScrollbar: true }">
    </div>
</template>
```
- ### Change speed of scroll
#### Example
```javascript
<template>
    <div v-drag-scroller="{ speed: 0.5 }">
    </div>
</template>
```
- ### Change direction of scroll
#### Example
```javascript
<template>
    <div v-drag-scroller="{ reverseDirection: true }">
    </div>
</template>
```
- ### Enable on mobile/touch devices
By default, drag scroll is disabled on mobile/touch devices to allow native touch scrolling. You can enable it:
#### Example
```javascript
<template>
    <div v-drag-scroller="{ enableOnMobile: true }">
    </div>
</template>
```
- ### Enable/disable drag scroll dynamically
You can enable or disable drag scroll dynamically:
#### Example
```javascript
<script setup>
import { ref } from 'vue'
const isDragEnabled = ref(true)
</script>

<template>
    <div v-drag-scroller="{ enabled: isDragEnabled }">
    </div>
    <button @click="isDragEnabled = !isDragEnabled">
      Toggle Drag Scroll
    </button>
</template>
```

## Contributing

Contributions are welcome! Here's how to get started:

### Prerequisites
- Node.js >= 18
- npm or yarn

### Setup
```bash
# Clone the repo
git clone https://github.com/huynamboz/vue-drag-scroller.git
cd vue-drag-scroller

# Install dependencies
npm install

# Build the library (required before running playground)
npm run build-lib
```

### Development
```bash
# Run the Vite example app
npm run dev

# Or use the Nuxt playground to test the Nuxt module
cd playground
npm install
npm run dev
```

### Nuxt Playground
A Nuxt 3 app is included in `playground/` for testing the `vue-drag-scroller/nuxt` module locally. It covers:
- Basic drag scroll
- `onlyX` / `onlyY` modifiers
- Dynamic `enabled` toggle
- `hideScrollbar` option
- Callback logging (`startScroll`, `endScroll`, `onScrolling`)

> **Note:** Run `npm run build-lib` at the root first so the `dist/` output is available.

### Submitting Changes
1. Fork the repo and create a branch from `dev`
2. Make your changes
3. Test with both the Vite example (`npm run dev`) and the Nuxt playground
4. Submit a pull request to the `dev` branch
