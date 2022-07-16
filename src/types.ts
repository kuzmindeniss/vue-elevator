export interface ElevatorI {
	from: number,
	current: number,
	to: null | number,
	queue: number[]
}