<script lang="ts">
	import Container from './Container.svelte';
	import Card from './Card.svelte';
	import Text from './Text.svelte';
	import Group from './Group.svelte';
	import './style.scss';
	import store from '../lib/store/index';
	import { get } from 'svelte/store';
	import { Ecosystem, DEBUG } from './simulation/simulation';
	import type { Report } from './simulation/simulation';

	get(store);

	const create = () =>
		new Ecosystem({
			simulationYears: Number.parseFloat($store.simulationYears),
			actionPerMonth: Number.parseFloat($store.actionPerMonth),
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

	let ecosystem: Ecosystem = create();
	let reports: Report = {};
	const getReport = () => {
		const keys = Object.keys(reports);

		if (keys.length === 0) {
			return {};
		}

		const y = reports[Number.parseInt(keys[keys.length - 1])];
		const keys2 = Object.keys(y);

		if (keys2.length === 0) {
			return {};
		}
		return y;
	};

	let reportsStr: any;

	function doSimulation() {
		ecosystem = create();
	}

	let year = 0;
	let semi = 0;
	let prey = 0;
	let pred = 0;
	function clock() {
		ecosystem.doYear();
		reports = ecosystem.getReport();
		reportsStr = getReport();
		year = ecosystem.yearCount;
		semi = ecosystem.semisCount;
		prey = ecosystem.preysCount;
		pred = ecosystem.predatorsCount;
	}

	function clock100() {
		ecosystem.doYears(100);
		reports = ecosystem.getReport();
		reportsStr = getReport();
		year = ecosystem.yearCount;
		semi = ecosystem.semisCount;
		prey = ecosystem.preysCount;
		pred = ecosystem.predatorsCount;
	}

	function deleteStorage() {
		localStorage.clear();
		location.reload();
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Container>
		<Card title="生態系セミAuto">
			<Group title="環境設定">
				<div class="text-center">
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="シミュレーション年数"
							bind:value={$store.simulationYears}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="1年当たりのアクション数"
							bind:value={$store.actionPerMonth}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]"></div>
				</div>
			</Group>

			<Group title="捕食者">
				<div class="text-center">
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="初期個体数" bind:value={$store.initPredCount} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="アクション当たりの自然生存率(%)"
							bind:value={$store.predSurvivalRate}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="寿命(年)" bind:value={$store.predLife} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="繁殖可能年齢" bind:value={$store.predBreedingAge} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="繁殖間隔(年)" bind:value={$store.predBreedingSpan} textType="number" />
					</div>

					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="非捕食者1匹当たりの捕食率(%)"
							bind:value={$store.predEatingRate}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="アクション当たりの生存最低限捕食数"
							bind:value={$store.predEatingMin}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="アクション当たりの最大捕食数"
							bind:value={$store.predEatingMax}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最小産卵数" bind:value={$store.predSpawningMin} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最大産卵数" bind:value={$store.predSpawningMax} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="繁殖率" bind:value={$store.predBreedingRate} textType="number" />
					</div>

					<div class="inline-block w-full py-1 md:w-[49%]"></div>
				</div>
			</Group>

			<Group title="自然数セミ">
				<div class="text-center">
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="初期個体数" bind:value={$store.initSemiCount} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="アクション当たりの自然生存率(%)"
							bind:value={$store.semiSurvivalRate}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="初期最短寿命(年)" bind:value={$store.initSemiMinLife} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="初期最長寿命(年)" bind:value={$store.initSemiMaxLife} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="寿命突然変異率(%)"
							bind:value={$store.semiMutationRate}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最小産卵数" bind:value={$store.semiSpawningMin} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最大産卵数" bind:value={$store.semiSpawningMax} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="繁殖率" bind:value={$store.semiBreedingRate} textType="number" />
					</div>

					<div class="inline-block w-full py-1 md:w-[49%]"></div>
				</div>
			</Group>

			<Group title="その他の被食者">
				<div class="text-center">
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="個体数" bind:value={$store.initPreyCount} textType="number" />
					</div>

					{#if false}
						<div class="inline-block w-full py-1 md:w-[49%]">
							<Text
								label="アクション当たりの自然生存率(%)"
								bind:value={$store.preySurvivalRate}
								textType="number"
							/>
						</div>
						<div class="inline-block w-full py-1 md:w-[49%]">
							<Text label="最小産卵数" bind:value={$store.preySpawningMin} textType="number" />
						</div>
						<div class="inline-block w-full py-1 md:w-[49%]">
							<Text label="最大産卵数" bind:value={$store.preySpawningMax} textType="number" />
						</div>
						<div class="inline-block w-full py-1 md:w-[49%]">
							<Text label="繁殖率" bind:value={$store.preyBreedingRate} textType="number" />
						</div>
						<div class="inline-block w-full py-1 md:w-[49%]">
							<Text label="適応数" bind:value={$store.preyAdoptCount} textType="number" />
						</div>
					{/if}

					<div class="inline-block w-full py-1 md:w-[49%]"></div>
				</div>
			</Group>

			<!--a href="/simulation">
				<input class="styled bg-slate-600 hover:bg-slate-500 active:bg-slate-400 text-white" type="button" value="シミュレーション開始">
			</a-->

			<!-- input
				class="styled bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-400"
				type="button"
				value="生成"
				on:click={doSimulation}
			/-->
			<input
				class="styled bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-400"
				type="button"
				value="1年シミュレーション"
				on:click={clock}
			/>
			<input
				class="styled bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-400"
				type="button"
				value="100年シミュレーション"
				on:click={clock100}
			/>
			<input
				class="styled bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-400"
				type="button"
				value="リセット"
				on:click={deleteStorage}
			/>

			{#if DEBUG}
				<Group title="デバッグログ">
					{#if reportsStr}
						<div class="">
							<div>
								{year}年目
							</div>

							{#each Object.keys(reportsStr) as i}
								<div class="pt-5">
									アクション{i}
								</div>
								<div>
									セミ出生数: {reportsStr[i]?.semi?.breedingCount || 0}
								</div>
								<div>
									セミ死亡数: {reportsStr[i]?.semi?.dyingCount || 0}
								</div>
								<div>
									捕食者出生数: {reportsStr[i]?.predator?.breedingCount || 0}
								</div>
								<div>
									捕食者死亡数: {reportsStr[i]?.predator?.dyingCount || 0}
								</div>
								<div>
									その他の被食者出生数: {reportsStr[i]?.prey?.breedingCount || 0}
								</div>
								<div>
									その他の被食者死亡数: {reportsStr[i]?.prey?.dyingCount || 0}
								</div>
							{/each}

							<div class="pt-5 text-red">
								<div>
									セミ: {semi}
								</div>
								<div>
									捕食者: {pred}
								</div>
								<div>
									被食者: {prey}
								</div>
							</div>
						</div>
					{/if}
				</Group>
			{/if}
		</Card>
	</Container>
</section>

<style lang="scss">
	@import './style.scss';
	.styled {
		border: 0;
		line-height: 2.5;
		padding: 0 20px;
		font-size: 1rem;
		text-align: center;
		border-radius: 10px;
	}
</style>
