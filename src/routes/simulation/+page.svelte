<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Container from '../Container.svelte';
	import Card from '../Card.svelte';
	import Group from '../Group.svelte';
	import '../style.scss';
	import store from '../../lib/store/index';
	import { get } from 'svelte/store';
	import { Ecosystem } from '../simulation/simulation';
	import type { Report, CountData } from '../simulation/simulation';

	get(store);

	let es = new Ecosystem({
		simulationYears: Number.parseFloat($store.simulationYears),
		actionPerMonth: Number.parseFloat($store.actionPerMonth),
		breedingLimit: Number.parseFloat($store.breedingLimit),
		initPredCount: Number.parseFloat($store.initPredCount),
		predLife: Number.parseFloat($store.predLife),
		predSurvivalRate: Number.parseFloat($store.predSurvivalRate),
		predBreedingSpan: Number.parseFloat($store.predBreedingSpan),
		predBreedingAge: Number.parseFloat($store.predBreedingAge),
		predBreedingRate: Number.parseFloat($store.predBreedingRate),
		predSpawningMin: Number.parseFloat($store.predSpawningMin),
		predSpawningMax: Number.parseFloat($store.predSpawningMax),
		predEatingRate: Number.parseFloat($store.predEatingRate),
		predEatingMin: Number.parseFloat($store.predEatingMin),
		predEatingMax: Number.parseFloat($store.predEatingMax),
		initSemiCount: Number.parseFloat($store.initSemiCount),
		initSemiMinLife: Number.parseFloat($store.initSemiMinLife),
		initSemiMaxLife: Number.parseFloat($store.initSemiMaxLife),
		semiSurvivalRate: Number.parseFloat($store.semiSurvivalRate),
		semiMutationRate: Number.parseFloat($store.semiMutationRate),
		semiSpawningMin: Number.parseFloat($store.semiSpawningMin),
		semiSpawningMax: Number.parseFloat($store.semiSpawningMax),
		semiBreedingRate: Number.parseFloat($store.semiBreedingRate),
		initPreyCount: Number.parseFloat($store.initPreyCount),
		preySurvivalRate: Number.parseFloat($store.preySurvivalRate),
		preySpawningMin: Number.parseFloat($store.preySpawningMin),
		preySpawningMax: Number.parseFloat($store.preySpawningMax),
		preyBreedingRate: Number.parseFloat($store.preyBreedingRate),
		preyAdoptCount: Number.parseFloat($store.initPreyCount)
	});

	let stopF = false;
	let fin = false;
	let yearCount = 0;

	let countData: CountData = {
		semis: {},
		semisSum: 0,
		pred: 0,
		prey: 0
	};

	let reports: Report = {};
	const toggle = () => {
		es.isStoped = !es.isStoped;
		stopF = es.isStoped;
		yearCount = es.yearCount;
	};

	onMount(async () => {
		let loop = true;
		let job = new Promise((r) => {
			r(0);
		});
		const interv = setInterval(async () => {
			if (loop) {
				loop = false
				job = new Promise(async (resolve2: (b: boolean) => void) => {
					reports = es.getReport();
					countData = es.getDistribution();
					yearCount = es.yearCount;
					resolve2(es.doYear());
				}).then((r) => {
					fin = !r
					if (fin){
						clearInterval(interv)
					}
					loop = true
				});
			}
		}, 20);
	});

	$: semiCount = Object.keys(countData.semis);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Container>
		<Card title="生態系セミAuto">
			<div>
				シミュレーション{yearCount}年目
			</div>
			<Group title="分布図">
				<table>
					<tr>
						<td> 捕食者 </td>
						<td>
							{countData.pred}
						</td>
					</tr>
					<tr>
						<td> セミ合計 </td>
						<td>
							{countData.semisSum}
						</td>
					</tr>
					{#each semiCount as p}
						<tr>
							<td>
								{p}年 セミ
							</td>
							<td>
								{countData.semis[Number(p)]}
							</td>
						</tr>
					{/each}
				</table>
			</Group>
			{#if !fin}
				<input
					class="styled bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-400"
					type="button"
					value={es.isStoped ? '再開' : '開始'}
					on:click={toggle}
				/>
			{/if}
			{#if fin}
				<a href="/">
					<input
						class="styled bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-400"
						type="button"
						value="終了"
					/>
				</a>
			{/if}
		</Card>
	</Container>
</section>

<style lang="scss">
	@import '../style.scss';
	.styled {
		border: 0;
		line-height: 2.5;
		padding: 0 20px;
		font-size: 1rem;
		text-align: center;
		border-radius: 10px;
	}

	td {
		border: 1px solid black;
		padding-left: 15px;
		padding-right: 15px;
	}
</style>
