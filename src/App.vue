<script setup lang="ts">
import FloorDividers from "@/components/FloorDividers.vue";
import ElevatorShafts from "@/components/ElevatorShafts.vue";
import ControlPanel from "@/components/ControlPanel.vue";
import {elevators, levels, pressedLevels} from "@/store";

const getIndexOfClosestElevator = (level: number): number => {
  let closestIndexOfElevator = 0;
  let closestAbs = levels.value;
  elevators.forEach((elevator, i) => {
    if (elevator.to) return;
    const abs = Math.abs(elevator.current - level);
    if (abs < closestAbs) {
      closestIndexOfElevator = i;
      closestAbs = abs;
    }
  })
  return closestIndexOfElevator;
}

const areAllElevatorsBusy = (): boolean => {
  for (let i = 0; i < elevators.length; i++) {
    if (!elevators[i].to) return false;
  }
  return true;
}

const isLevelOccupied = (level: number): boolean => {
  for (let i = 0; i < elevators.length; i++) {
    if (elevators[i].from === level && !elevators[i].to) return true;
  }
  return false;
}

const controlClicked = (level: number) => {
  if (pressedLevels[level] || areAllElevatorsBusy() || isLevelOccupied(level)) return;
  pressedLevels[level] = true;
  const elevatorIdx = getIndexOfClosestElevator(level);
  elevators[elevatorIdx].to = level;
}
</script>


<template>
  <div class="app-wrapper">
    <FloorDividers/>
    <div class="elevator-shafts__wrapper">
      <ElevatorShafts/>
      <ControlPanel @control-clicked="controlClicked"/>
    </div>
  </div>
</template>

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

</style>
