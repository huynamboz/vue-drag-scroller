<script setup>
import { dragScroller as vDragScroller } from  "../../../src"

</script>

<template>
  <div v-drag-scroller.onlyY class="drag-container" style="height: 400px;">
    <img src="https://picsum.photos/seed/picsum/800/800" class="bg-img" alt="">
  </div>
</template>
