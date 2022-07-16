import {reactive, ref} from 'vue';
import {ElevatorI, PressedLevelsI} from "@/types";
import elevatorsInit from '@/elevatorsInit.json';
import Cookies from "js-cookie";

const initAllCookies = (): {
	elevatorsQuantity: number | undefined;
	levels: number | undefined;
	pressedLevels: PressedLevelsI | undefined;
	elevators: ElevatorI[] | undefined;
} => {
	const elevatorsQuantity = Cookies.get('elevators-quantity');
	const levels = Cookies.get('levels');
	const pressedLevelsCookies = Cookies.get('pressed-levels');
	const elevatorsCookies = Cookies.get('elevators');

	return  {
		elevatorsQuantity: elevatorsQuantity ? Number(elevatorsQuantity) : undefined,
		levels: levels ? Number(levels) : undefined,
		pressedLevels: pressedLevelsCookies ? JSON.parse(pressedLevelsCookies) : undefined,
		elevators: elevatorsCookies ? JSON.parse(elevatorsCookies) : undefined,
	}
}

const cookies = initAllCookies();
console.log(cookies);

export const elevatorsQuantity = ref(cookies.elevatorsQuantity ? cookies.elevatorsQuantity : elevatorsInit.elevatorsQuantity);
export const levels = ref(cookies.levels ? cookies.levels : elevatorsInit.levels);

export const pressedLevels = reactive<PressedLevelsI>(cookies.pressedLevels ? cookies.pressedLevels : {});

export const elevators: ElevatorI[] = reactive(cookies.elevators ? cookies.elevators : []);
if (!elevators[0]) {
	for (let i = 0; i < elevatorsQuantity.value; i++ ) {
		elevators.push({
			from: 1,
			current: 1,
			to: null,
			queue: []
		});
	}
}

export const saveToCookies = () => {
	Cookies.set('elevators-quantity', String(elevatorsQuantity.value));
	Cookies.set('levels', String(levels.value));
	Cookies.set('pressed-levels', JSON.stringify(pressedLevels));
	Cookies.set('elevators', JSON.stringify(elevators));
}

export const resetAllCookies = () => {
	Cookies.remove('elevators-quantity');
	Cookies.remove('levels');
	Cookies.remove('pressed-levels');
	Cookies.remove('elevators');
}