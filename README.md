
# vue-drag-scroller
<!-- tag -->
[![npm version](https://img.shields.io/npm/v/vue-drag-scroller.svg)](https://www.npmjs.com/package/vue-drag-scroller)
[![npm download](https://img.shields.io/npm/dm/vue-drag-scroller.svg)](https://www.npmjs.com/package/vue-drag-scroller)
[![npm license](https://img.shields.io/npm/l/vue-drag-scroller.svg)](https://www.npmjs.com/package/vue-drag-scroller)
<!-- endtag -->
This package help you drag to scroll easier🌟 <br>
![2024-01-1322-16-59online-video-cutter com-ezgif com-crop](https://github.com/huynamboz/vue-drag-scroller/assets/38585889/d4143c76-9240-4163-a444-00bae811a138)

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
### Options:
you can pass options to directive like this:
```javascript
<template>
    <div v-drag-scroller="options">
    </div>
</template>
```
| Name | Description | Type | Default |
|--|--|--|--|
| startScroll | Trigger when start scroll | Function | null |
| endScroll | Trigger when end scroll | Function | null |
### Binding value:
you can pass binding value to directive like this:
```javascript
<template>
    <div v-drag-scroller.onlyX>
    </div>
</template>
```
| Name | Description | Type | Default |
|--|--|--|--|
| disablechild | Disable drag scroll in all child | Boolean | false |
| drag-scroller-disable | Disable drag scroll in particular child | Boolean | false |
| onlyX | Only scroll in X axis | Boolean | false |
| onlyY | Only scroll in Y axis | Boolean | false |

Priority: disablechild > drag-scroller-disable > onlyX > onlyY
### Events:
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