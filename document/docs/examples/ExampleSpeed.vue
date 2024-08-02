<script setup>
import { dragScroller as vDragScroller } from  "vue-drag-scroller"

const options = {
  speed: 0.5 // default is 1
}
</script>

<template>
  <div v-drag-scroller="options" class="drag-container" style="height: 400px;">
    <img src="https://picsum.photos/seed/picsum/800/800" class="bg-img" alt="">
  </div>
</template>
