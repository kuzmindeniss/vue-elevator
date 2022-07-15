<template>
  <div class="app-wrapper">
    <FloorDividers :levels="levels"/>
    <div class="elevator-shafts__wrapper">
      <ul class="elevator-shafts">
        <li v-for="n in elevatorsQuantity" :key="n" class="elevator-shafts__item">
          <div class="elevator" :style="{height: 100 / levels + '%'}"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import FloorDividers from "@/components/FloorDividers.vue";

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

.elevator-shafts {
  display: flex;
  padding-left: 10px;

  &__wrapper {
    display: flex;
    height: 100%;
  }

  &__item {
    position: relative;
    width: 122px;
    margin-right: 10px;
    border-left: 2px solid #c9c5c5;
    border-right: 2px solid #c9c5c5;
  }
}

.elevator {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #b6f4ff;
}

</style>
