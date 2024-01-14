<script setup lang="ts">
const onScroll = (e: Event) => {
  console.log("working" ,e);
};
const onEndScroll = (e: Event) => {
  console.log("end scroll" ,e);
};
const options = {
  startScroll: onScroll,
  endScroll: onEndScroll,
};
</script>

<template>
  <body>
    <div class="container">
      <a href="https://github.com/huynamboz/vue-drag-scroller/blob/dev/example/App.vue"><code>https://github.com/huynamboz/vue-drag-scroller/blob/dev/example/App.vue</code></a>
      <div class="container--normal">
        <p>Normal option: <code>v-drag-scroller</code></p>
        <div v-drag-scroller="options" class="wrapper">
          <div class="content">
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
          </div>
        </div>
      </div>
      <!-- disable all child -->
      <div class="container--normal">
        <p>Normal option: <code>v-drag-scroller.disablechild</code></p>
        <div v-drag-scroller.disablechild="options" class="wrapper">
          <div class="content">
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.wrapper {
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
  background-color: rgb(184, 184, 184);
  overflow: auto;
  height: 300px;
  white-space: nowrap;
}
.content {
  height: 70%;
  width: 600px;
  background-color: brown;
  display: flex;
  align-items: center;
}
.box {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: rgb(226, 39, 39);
  margin: 10px;
}
</style>
