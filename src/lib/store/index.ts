import { writable } from 'svelte/store';

export const simulationYears = writable('1000');
export const actionPerMonth = writable('2');

export const initPredCount = writable('50');
export const predLife = writable('5');
export const predSurvivalRate = writable('100');
export const predBreedingSpan = writable('1');
export const predBreedingAge = writable('3');
export const predSpawningMin = writable('3');
export const predSpawningMax = writable('7');
export const predEatingRate = writable('0.5');
export const predEatingMin = writable('1');
export const predEatingMax = writable('3');
export const predBreedingRate = writable('100');

export const initSemiCount = writable('5000');
export const initSemiMinLife = writable('1');
export const initSemiMaxLife = writable('15');
export const semiSurvivalRate = writable('97');
export const semiMutationRate = writable('1');
export const semiSpawningMin = writable('2');
export const semiSpawningMax = writable('3');
export const semiBreedingRate = writable('100');

export const initPreyCount = writable('1000');
export const preySurvivalRate = writable('100');
export const preySpawningMin = writable('0');
export const preySpawningMax = writable('0');
export const preyBreedingRate = writable('0');
export const preyAdoptCount = writable('1000');
