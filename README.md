
# vue-drag-scroller
<!-- tag -->
[![npm version](https://img.shields.io/npm/v/vue-drag-scroller.svg)](https://www.npmjs.com/package/vue-drag-scroller)
[![npm download](https://img.shields.io/npm/dm/vue-drag-scroller.svg)](https://www.npmjs.com/package/vue-drag-scroller)
[![npm license](https://img.shields.io/npm/l/vue-drag-scroller.svg)](https://www.npmjs.com/package/vue-drag-scroller)
<!-- endtag -->
This package help you drag to scroll easier🌟
## How to install🔖
**NPM**

    npm install vue-drag-scroller
**YARN**

    yarn add vue-drag-scroller

## Usage🔖

Use with vue 3: <br>
	**Register global:**
```javascript
import  { createApp }  from  'vue'
import VueDragScroller from  "vue-drag-scroller"
       
import App from  './App.vue'

const app  =  createApp(App)
app.use(VueDragScroller)
app.mount('#app')
  
// in component
<template>
	<div v-drag-scroller>
	</div>
</template>
```

## Config🔖
### Options
| Name | Description | Type | Default |
|--|--|--|--|
| startScroll | Trigger when start scroll | Function | null |
| endScroll | Trigger when end scroll | Function | null |
### Events
| Name | Description |
|--|--|
| startScroll | Trigger when start scroll |
| endScroll | Trigger when end scroll |
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
<!-- ### Drag parent except all child
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
``` -->
### Drag parent except particular child
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