<template>
  <ul class="floor-dividers">
    <li style="top: 0" class="floor-dividers__item"></li>
    <li v-for="n in levels" :key="n" :style="{top: n * (100 / levels) + '%'}" class="floor-dividers__item"></li>
  </ul>
</template>

<script setup lang="ts">
import {levels} from "@/store";
</script>

<style scoped lang="scss">
.floor-dividers {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: .8;

  &__item {
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #ececec;
  }
}
</style>