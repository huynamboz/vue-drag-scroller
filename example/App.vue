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
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div v-drag-scroller="{
      startScroll: onScroll,
    }" class="wrapper">
      <div class="content">
        <div data-drag-scroller-disable class="box"></div>
        <div drag-scroller-disable class="box"></div>
        <div drag-scroller-disable class="box"></div>
        <div drag-scroller-disable class="box"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.wrapper {
  width: 300px;
  background-color: rgb(184, 184, 184);
  overflow: auto;
  height: 300px;
  white-space: nowrap;
}
.content {
  height: 100%;
  width: 600px;
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
