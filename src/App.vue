<template>
  <div class="app-wrapper">
    <ul class="floor-dividers">
      <li v-for="n in levels" :key="n" :style="{top: n * (100 / levels) + '%'}" class="floor-dividers__item"></li>
    </ul>
    <div class="elevator-shafts__wrapper">
      <ul class="elevator-shafts">
        <li v-for="n in elevatorsQuantity" :key="n" class="elevator-shafts__item"></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const levels = 5;
const elevatorsQuantity = 2;


</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  position: relative;
  padding: 8px;
  height: 1px;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*, *:after, *:before {
  box-sizing: border-box;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.floor-dividers {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 2px solid #ececec;

  &__item {
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: #ececec;
  }
}

.elevator-shafts {
  display: flex;
  padding-left: 10px;

  &__wrapper {
    display: flex;
    height: 100%;
  }

  &__item {
    width: 100px;
    margin-right: 10px;
    background-color: #42b983;
  }
}
</style>
