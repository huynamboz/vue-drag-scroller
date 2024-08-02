# How to use 🔖

<script setup>
  import Example1 from './examples/Example1.vue'
  import ExampleExceptChild from './examples/ExampleExceptChild.vue'
  import ExampleExceptSpecChild from './examples/ExampleExceptSpecChild.vue'
  import ExampleOnlyX from './examples/ExampleOnlyX.vue'
  import ExampleOnlyY from './examples/ExampleOnlyY.vue'
  import ExampleOnlyHideScroll from './examples/ExampleOnlyHideScroll.vue'
  import ExampleSpeed from './examples/ExampleSpeed.vue'
</script>
## Basic Usage

To use the `VueDragScroller` directive, simply add it to the element you want to enable drag scrolling on. For example, to enable drag scrolling on a `div` element has class `container`, you can use the following code:

<ClientOnly>
  <Example1 />
</ClientOnly>

::: details Show code
```vue{2}
<template>
  <div v-drag-scroller class="container">
    <div class="content" v-for="n in 10"></div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 150px;
  overflow: auto;
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  cursor: grab;
}

.content {
  width: 100px;
  min-width: 100px;
  height: 100px;
  background-color: #ff9797;
  margin: 10px 0;
}
</style>
```
:::

## Disable all child

If you want to exclude all child elements from drag scrolling, you can use the `disablechild` modifier. For example, to exclude the first child element from drag scrolling, you can use the following code:

<ClientOnly>
  <ExampleExceptChild />
</ClientOnly>

::: details Show code

```vue{2}
<template>
  <div v-drag-scroller.disablechild class="container">
    <div class="content" v-for="n in 10"></div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 150px;
  overflow: auto;
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  cursor: grab;
}

.content {
  width: 100px;
  min-width: 100px;
  height: 100px;
  background-color: #ff9797;
  margin: 10px 0;
}
</style>
```
:::

## Disable specific child

If you want to exclude specific child elements from drag scrolling, you can use the  `drag-scroller-disable` attribute. For example, to exclude the first child element from drag scrolling, you can use the following code:

<ClientOnly>
  <ExampleExceptSpecChild />
</ClientOnly>

::: details Show code
```vue{6,7,8}
<template>
  <div v-drag-scroller class="container">
    <div class="content" drag-scroller-disable>child disabled</div>
    <div class="content" drag-scroller-disable>child disabled</div>
    <div class="content">child</div>
    <div class="content">child</div>
    <div class="content">child</div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 150px;
  overflow: auto;
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  cursor: grab;
}

.content {
  width: 100px;
  min-width: 100px;
  height: 100px;
  background-color: #ff9797;
  margin: 10px 0;
}
</style>
```
:::

## Only scroll in X axis

If you want to scroll only in the X axis, you can use the `onlyX` modifier. For example, to scroll only in the X axis, you can use the following code:

<ClientOnly>
  <ExampleOnlyX />
</ClientOnly>

::: details Show code

```vue{2}
<template>
  <div v-drag-scroller.onlyX class="drag-container" style="height: 400px;">
    <img src="https://picsum.photos/seed/picsum/800/800" class="bg-img" alt="">
  </div>
</template>
```
:::

## Only scroll in Y axis

If you want to scroll only in the Y axis, you can use the `onlyY` modifier. For example, to scroll only in the Y axis, you can use the following code:

<ClientOnly>
  <ExampleOnlyY />
</ClientOnly>

::: details Show code

```vue{2}
<template>
  <div v-drag-scroller.onlyY class="drag-container" style="height: 400px;">
    <img src="https://picsum.photos/seed/picsum/800/800" class="bg-img" alt="">
  </div>
</template>
```
:::

## Hide scrollbar

If you want to hide the scrollbar, you can use option `hideScrollbar: true`. For example, to hide the scrollbar, you can use the following code:

<ClientOnly>
  <ExampleOnlyHideScroll />
</ClientOnly>

::: details Show code

```vue{3}
<script setup>
const options = {
  hideScrollbar: true
}
</script>

<template>
  <div v-drag-scroller="options" class="drag-container" style="height: 400px;">
    <img src="https://picsum.photos/seed/picsum/800/800" class="bg-img" alt="">
  </div>
</template>
```
:::

## Speed

If you want to change the speed of the scroll, you can use the `speed` option. For example, to change the speed of the scroll, you can use the following code:

<ClientOnly>
  <ExampleSpeed />
</ClientOnly>

::: details Show code

```vue{3}
<script setup>
const options = {
  speed: 2 //default is 1
}
</script>

<template>
  <div v-drag-scroller="options" class="drag-container" style="height: 400px;">
    <img src="https://picsum.photos/seed/picsum/800/800" class="bg-img" alt="">
  </div>
</template>
```
:::