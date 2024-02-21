<script lang="ts">
	import Container from '../Container.svelte';
	import Card from '../Card.svelte';
	import Group from '../Group.svelte';
	import '../style.scss';
	import {
		simulationYears,
		actionPerMonth,
		initPredCount,
		predLife,
		predSurvivalRate,
		predBreedingSpan,
		predBreedingAge,
		predSpawningMin,
		predSpawningMax,
		predEatingRate,
		predEatingMin,
		predEatingMax,
		initSemiCount,
		initSemiMinLife,
		initSemiMaxLife,
		semiSurvivalRate,
		semiMutationRate,
		semiSpawningMin,
		semiSpawningMax,
		initPreyCount,
		preySurvivalRate,
		preySpawningMin,
		preySpawningMax
	} from '../../lib/store/index';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Container>
		<Card title="生態系セミAuto">
			<Group title="環境設定">
				{$simulationYears}
			</Group>
		</Card>
	</Container>
</section>

<style lang="scss">
	@import '../style.scss';
</style>
