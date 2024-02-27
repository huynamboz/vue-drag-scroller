<script setup lang="ts">
const onScroll = (e: Event) => {
  console.log("working" ,e);
};
const onEndScroll = (e: Event) => {
  console.log("end scroll" ,e);
};
const onScrolling = (e: Event) => {
  console.log("scrolling" ,e);
};
const options = {
  startScroll: onScroll,
  endScroll: onEndScroll,
  onScrolling: onScrolling,
  speed: 1,
  reverseDirection: true,
};
</script>

<template>
  <body>
    <a href="https://github.com/huynamboz/vue-drag-scroller/blob/dev/example/App.vue"><code>https://github.com/huynamboz/vue-drag-scroller/blob/dev/example/App.vue</code></a>
    <div class="container">
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
      <!-- only scroll horizontal -->
      <div class="container--normal">
        <p>Only scroll horizontal: <code>v-drag-scroller.onlyX</code></p>
        <div v-drag-scroller.onlyX="options" class="wrapper only">
          <div class="content">
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
          </div>
          <div class="content">
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
          </div>
          <div class="content">
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
          </div>
        </div>
      </div>
       <!-- only scroll vertical -->
       <div class="container--normal">
        <p>Only scroll vertical: <code>v-drag-scroller.onlyX</code></p>
        <div v-drag-scroller.onlyY="{...options, hideScrollbar: true}" class="wrapper only">
          <div class="content">
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
          </div>
          <div class="content">
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
            <div  class="box"></div>
          </div>
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
body {
  width: 100%;
}
.container {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.wrapper {
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
  background-color: rgb(184, 184, 184);
  overflow: auto;
  height: 300px;
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.wrapper.only {
  flex-direction: column;
  gap: 20px;
  padding: 40px;
}
.wrapper.only .content {
  height: 100px;
  min-height: 100px;
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
.container--normal {
  display: flex;
  gap: 20px;
}
</style>
