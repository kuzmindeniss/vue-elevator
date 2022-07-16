<script setup lang="ts">
import {elevators, levels, pressedLevels} from '@/store';
import {ref, watch} from "vue";
import gsap from 'gsap';

const props = defineProps<{
  index: number
}>();
const elevator = elevators[props.index];
const elevatorRef = ref<HTMLDivElement | null>(null);

const movingDirection = ref<'top' | 'bottom' | null>(null);

const oneLevelToPercent = 100 / levels.value;

const height = ref<number>(oneLevelToPercent);

watch(elevator.queue, (queue) => {
  if (!queue[0]) return;
  elevator.to = queue[0];
});

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
  if (movingDirection.value) return;
  movingDirection.value = to - from > 0 ? 'top' : 'bottom';

  let _current = from;

  if (to > from) {
    while (_current !== to) {
      _current += await moveStep(_current, 1);
    }
  }
  if (to < from) {
    while (_current !== to) {
      _current += await moveStep(_current, -1);
    }
  }
  elevator.current = to;
  pressedLevels[to] = false;
  await stay();
  movingDirection.value = null;
  elevator.from = to;
  elevator.to = null;
  elevator.queue.shift();
  pressedLevels[to] = false;
}


const tl = gsap.timeline();

const stay = () => {
  const opacity = .5;

  return new Promise<boolean>(resolve => {
    tl.to(elevatorRef.value, {
      duration: .5,
      alpha: opacity,
    }).to(elevatorRef.value, {
      duration: .5,
      alpha: 1,
    }).to(elevatorRef.value, {
      duration: .5,
      alpha: opacity,
    }).to(elevatorRef.value, {
      duration: .5,
      alpha: 1,
    }).to(elevatorRef.value, {
      duration: .5,
      alpha: opacity,
    }).to(elevatorRef.value, {
      duration: .5,
      alpha: 1,
      onComplete: () => {
        resolve(true);
      }
    })
  })
}

const moveStep = (current: number, delta: number) => {
  return new Promise<number>(resolve => {
    tl.to(elevatorRef.value, {
      duration: 1,
      bottom: oneLevelToPercent * (current - 1 + delta) + '%',
      ease: 'none',
      onComplete: () => {
        elevator.current = elevator.current + delta;
        resolve(delta)
      }
    });
  });
}
</script>

<template>
  <div ref="elevatorRef" class="elevator" :style="{height: height + '%'}">
    <div class="elevator__info" v-show="movingDirection">
      <div :class="{
        'elevator__arrow': true,
        'elevator__arrow--bottom': movingDirection === 'bottom'
      }"></div>
      <div class="elevator__to-number">{{elevator.to}}</div>
    </div>
  </div>
</template>

<style lang="scss">
.elevator {
  position: absolute;
  bottom: 0;
  padding-top: 8px;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  background-color: #b6f4ff;
}

.elevator__arrow {
  width: 20px;
  height: 20px;
  transition: all .5s;
  background: url('@/assets/arrow.svg');

  &--bottom {
    transform: rotate(180deg);
  }
}

.elevator__info {
  display: flex;
  justify-content: center;
  padding: 8px 12px;
  background: rgba(0, 0, 0, .1);
  border-radius: 4px;
}

</style>