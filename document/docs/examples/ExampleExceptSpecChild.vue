<script setup>
import { dragScroller as vDragScroller } from  "vue-drag-scroller"

</script>

<template>
  <div v-drag-scroller class="drag-container">
    <div drag-scroller-disable class="drag-content">child disabled</div>
    <div drag-scroller-disable class="drag-content">child disabled</div>
    <div class="drag-content">child</div>
    <div class="drag-content">child</div>
    <div class="drag-content">child</div>
  </div>
</template>
<style module>

</style>