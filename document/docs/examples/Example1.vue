<script setup>
import { dragScroller as vDragScroller } from  "vue-drag-scroller"

</script>

<template>
  <div v-drag-scroller class="drag-container">
    <div class="drag-content" v-for="n in 10"></div>
  </div>
</template>