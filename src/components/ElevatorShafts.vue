<script setup lang="ts">
import {elevators} from "@/store";
import ElevatorElement from "@/components/ElevatorElement.vue";


</script>

<template>
  <ul class="elevator-shafts">
    <li v-for="(elevator, i) in elevators" :key="i" class="elevator-shafts__item">
      <ElevatorElement :index="i"/>
    </li>
  </ul>
</template>


<style lang="scss">
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
</style>