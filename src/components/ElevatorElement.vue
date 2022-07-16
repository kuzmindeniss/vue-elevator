<script setup lang="ts">
import {elevators, levels, pressedLevels} from '@/store';
import {reactive, ref, watch} from "vue";
import gsap from 'gsap';

const props = defineProps<{
  index: number
}>();

const isMoving = ref<boolean>(false);
const elevator = elevators[props.index];
const elevatorRef = ref<HTMLDivElement | null>(null);

const oneLevelToPercent = 100 / levels.value;

const styleObject = reactive({
  height: oneLevelToPercent + '%',
  bottom: 0
})

watch(elevator, (elevator) => {
  if (!elevator) return;
  if (elevator.to && (elevator.to > elevator.current)) {
    moveTo(elevator.current, elevator.to);
  }
  if (elevator.to && (elevator.to < elevator.current)) {
    moveTo(elevator.current, elevator.to);
  }
})


const moveTo = async (from: number, to: number) => {
  if (isMoving.value === true) return;
  isMoving.value = true;

  let _current = from;

  if (to > from) {
    while (_current !== to) {
      console.log(_current);
      _current += await moveStep(_current, 1);
    }
  }
  if (to < from) {
    while (_current !== to) {
      _current += await moveStep(_current, -1);
    }
  }
  isMoving.value = false;
  elevator.current = to;
  elevator.from = to;
  elevator.to = null;
  elevator.queue.shift();
  pressedLevels[to] = false;
}

const tl = gsap.timeline();

const moveStep = (current: number, delta: number) => {
  return new Promise<number>(resolve => {
    tl.to(elevatorRef.value, {
      duration: 1,
      bottom: oneLevelToPercent * (current - 1 + delta) + '%',
      ease: 'none',
      onComplete: () => {
        resolve(delta)
      }
    });
  });
}

</script>

<template>
  <div ref="elevatorRef" class="elevator" :style="styleObject"></div>
</template>

<style scoped lang="scss">

.elevator {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #b6f4ff;
}
</style>