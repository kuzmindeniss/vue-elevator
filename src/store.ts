import {reactive, ref} from 'vue';
import {ElevatorI} from "@/types";

export const elevatorsQuantity = ref(4);
export const levels = ref(7);

export const pressedLevels = reactive<{[key: number]: boolean}>({});

export const elevators: ElevatorI[] = reactive([]);
for (let i = 0; i < elevatorsQuantity.value; i++ ) {
	elevators.push({
		from: 1,
		current: 1,
		to: null,
		queue: []
	});
}