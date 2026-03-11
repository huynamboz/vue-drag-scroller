<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(true)

const onStartScroll = (e: PointerEvent) => {
  console.log('startScroll', e)
}
const onEndScroll = (e?: PointerEvent) => {
  console.log('endScroll', e)
}
const onScrolling = (e: PointerEvent) => {
  console.log('onScrolling', e)
}
</script>

<template>
  <div style="font-family: sans-serif; padding: 24px;">
    <h1>vue-drag-scroller — Nuxt Playground</h1>

    <!-- Basic drag scroll -->
    <section>
      <h2>Basic <code>v-drag-scroller</code></h2>
      <div v-drag-scroller class="scroll-container horizontal">
        <div v-for="i in 20" :key="i" class="box">{{ i }}</div>
      </div>
    </section>

    <!-- onlyX -->
    <section>
      <h2><code>v-drag-scroller.onlyX</code></h2>
      <div v-drag-scroller.onlyX class="scroll-container horizontal wrap">
        <div v-for="i in 40" :key="i" class="box small">{{ i }}</div>
      </div>
    </section>

    <!-- onlyY -->
    <section>
      <h2><code>v-drag-scroller.onlyY</code></h2>
      <div v-drag-scroller.onlyY class="scroll-container vertical">
        <div v-for="i in 20" :key="i" class="box wide">{{ i }}</div>
      </div>
    </section>

    <!-- Dynamic enabled toggle -->
    <section>
      <h2>Dynamic toggle (<code>enabled: {{ enabled }}</code>)</h2>
      <button @click="enabled = !enabled" style="margin-bottom: 8px;">
        {{ enabled ? 'Disable' : 'Enable' }} drag scroll
      </button>
      <div v-drag-scroller="{ enabled }" class="scroll-container horizontal">
        <div v-for="i in 20" :key="i" class="box">{{ i }}</div>
      </div>
    </section>

    <!-- hideScrollbar -->
    <section>
      <h2><code>hideScrollbar: true</code></h2>
      <div v-drag-scroller="{ hideScrollbar: true }" class="scroll-container horizontal">
        <div v-for="i in 20" :key="i" class="box">{{ i }}</div>
      </div>
    </section>

    <!-- Callbacks -->
    <section>
      <h2>Callbacks (check console)</h2>
      <div
        v-drag-scroller="{
          startScroll: onStartScroll,
          endScroll: onEndScroll,
          onScrolling: onScrolling,
        }"
        class="scroll-container horizontal"
      >
        <div v-for="i in 20" :key="i" class="box">{{ i }}</div>
      </div>
    </section>
  </div>
</template>

<style>
.scroll-container {
  overflow: auto;
  border: 2px solid #ccc;
  border-radius: 8px;
  background: #f5f5f5;
  margin-bottom: 24px;
  cursor: grab;
}
.scroll-container.horizontal {
  display: flex;
  white-space: nowrap;
  height: 160px;
  align-items: center;
}
.scroll-container.wrap {
  flex-wrap: wrap;
  height: 200px;
  width: 400px;
}
.scroll-container.vertical {
  height: 200px;
  width: 300px;
}
.box {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  margin: 10px;
  background: #4a90d9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  user-select: none;
}
.box.small {
  width: 60px;
  height: 60px;
  font-size: 14px;
}
.box.wide {
  width: 260px;
  height: 80px;
  flex-shrink: 0;
}
section {
  margin-bottom: 32px;
}
h2 {
  margin-bottom: 8px;
}
</style>
