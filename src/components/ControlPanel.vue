<script setup lang="ts">
import {levels, pressedLevels} from "@/store";

const emit = defineEmits<{
  (e: 'controlClicked', level: number): void
}>();
</script>

<template>
  <ul class="control">
    <li v-for="n in levels"
        :key="n"
        :style="{height: 100 / levels + '%'}"
        :class="{
          'control__level': true,
          'control__level--active': pressedLevels[n]
         }"
    >
      <div class="control__level-label">{{ n }}</div>
      <div class="control__button" @click="emit('controlClicked', n)">
        <div class="control__button-inner"></div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
.control {
  display: flex;
  flex-flow: column-reverse;
}

.control__level {
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  padding-top: 8px;
  font-weight: bold;

  &-label {
    height: 40.333%;
  }
}

.control__button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border: 2px solid deepskyblue;
  border-radius: 4px;
  cursor: pointer;
  transition: all .5s;

  &:hover {
    opacity: .5;
  }

  &-inner {
    height: 10px;
    width: 10px;
    border-radius: 16px;
    background-color: deepskyblue;
    transition: all .5s;
  }
}

.control__level--active .control__button {
  border: 2px solid red;
}

.control__level--active .control__button-inner {
  background-color: red;
}
</style>