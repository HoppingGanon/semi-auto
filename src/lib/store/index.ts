import { persisted } from 'svelte-persisted-store';

export default persisted('preferences', {
	simulationYears: '100',
	actionPerMonth: '2',
	breedingLimit: '10000',

	initPredCount: '50',
	predLife: '5',
	predSurvivalRate: '100',
	predBreedingSpan: '2',
	predBreedingAge: '3',
	predSpawningMin: '2',
	predSpawningMax: '6',
	predEatingRate: '0.5',
	predEatingMin: '1',
	predEatingMax: '10',
	predBreedingRate: '100',

	initSemiCount: '3000',
	initSemiMinLife: '1',
	initSemiMaxLife: '15',
	semiSurvivalRate: '100',
	semiMutationRate: '1',
	semiSpawningMin: '2',
	semiSpawningMax: '4',
	semiBreedingRate: '100',

	initPreyCount: '500',
	preySurvivalRate: '100',
	preySpawningMin: '0',
	preySpawningMax: '0',
	preyBreedingRate: '0',
	preyAdoptCount: '500'
});
