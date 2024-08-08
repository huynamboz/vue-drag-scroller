<script setup>
import { dragScroller as vDragScroller } from  "../../../src"

</script>

<template>
  <div v-drag-scroller.disablechild class="drag-container">
    <div class="drag-content">child</div>
    <div class="drag-content">child</div>
    <div class="drag-content">child</div>
    <div class="drag-content">child</div>
    <div class="drag-content">child</div>
  </div>
</template>