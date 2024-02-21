<script lang="ts">
	import Container from './Container.svelte';
	import Card from './Card.svelte';
	import Text from './Text.svelte';
	import Group from './Group.svelte';
	import './style.scss';
	import {
		simulationYears,
		actionPerMonth,
		initPredCount,
		predLife,
		predSurvivalRate,
		predBreedingSpan,
		predBreedingAge,
		predBreedingRate,
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
		preyBreedingRate,
		initPreyCount,
		preySurvivalRate,
		preySpawningMin,
		preySpawningMax,
		semiBreedingRate,
		preyAdoptCount
	} from '../lib/store/index';
	import { Ecosystem } from './simulation/simulation';

	const create = () =>
		new Ecosystem({
			simulationYears: Number.parseFloat($simulationYears),
			actionPerMonth: Number.parseFloat($actionPerMonth),
			initPredCount: Number.parseFloat($initPredCount),
			predLife: Number.parseFloat($predLife),
			predSurvivalRate: Number.parseFloat($predSurvivalRate),
			predBreedingSpan: Number.parseFloat($predBreedingSpan),
			predBreedingAge: Number.parseFloat($predBreedingAge),
			predBreedingRate: Number.parseFloat($predBreedingRate),
			predSpawningMin: Number.parseFloat($predSpawningMin),
			predSpawningMax: Number.parseFloat($predSpawningMax),
			predEatingRate: Number.parseFloat($predEatingRate),
			predEatingMin: Number.parseFloat($predEatingMin),
			predEatingMax: Number.parseFloat($predEatingMax),
			initSemiCount: Number.parseFloat($initSemiCount),
			initSemiMinLife: Number.parseFloat($initSemiMinLife),
			initSemiMaxLife: Number.parseFloat($initSemiMaxLife),
			semiSurvivalRate: Number.parseFloat($semiSurvivalRate),
			semiMutationRate: Number.parseFloat($semiMutationRate),
			semiSpawningMin: Number.parseFloat($semiSpawningMin),
			semiSpawningMax: Number.parseFloat($semiSpawningMax),
			semiBreedingRate: Number.parseFloat($semiBreedingRate),
			initPreyCount: Number.parseFloat($initPreyCount),
			preySurvivalRate: Number.parseFloat($preySurvivalRate),
			preySpawningMin: Number.parseFloat($preySpawningMin),
			preySpawningMax: Number.parseFloat($preySpawningMax),
			preyBreedingRate: Number.parseFloat($preyBreedingRate),
			preyAdoptCount: Number.parseFloat($preyAdoptCount)
		});

	let ecosystem: Ecosystem = create();
	function doSimulation() {
		console.log('生成');
		ecosystem = create();
	}

	function clock() {
		ecosystem.doYear();
		console.log(ecosystem.getReport());
		console.log(ecosystem);
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
						<Text label="シミュレーション年数" bind:value={$simulationYears} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="1年当たりのアクション数" bind:value={$actionPerMonth} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]"></div>
				</div>
			</Group>

			<Group title="捕食者">
				<div class="text-center">
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="初期個体数" bind:value={$initPredCount} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="アクション当たりの自然生存率(%)"
							bind:value={$predSurvivalRate}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="寿命(年)" bind:value={$predLife} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="繁殖可能年齢" bind:value={$predBreedingAge} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="繁殖間隔(年)" bind:value={$predBreedingSpan} textType="number" />
					</div>

					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="非捕食者1匹当たりの捕食率(%)"
							bind:value={$predEatingRate}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="アクション当たりの生存最低限捕食数"
							bind:value={$predEatingMin}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="アクション当たりの最大捕食数"
							bind:value={$predEatingMax}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最小産卵数" bind:value={$predSpawningMin} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最大産卵数" bind:value={$predSpawningMax} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="繁殖率" bind:value={$predBreedingRate} textType="number" />
					</div>

					<div class="inline-block w-full py-1 md:w-[49%]"></div>
				</div>
			</Group>

			<Group title="自然数セミ">
				<div class="text-center">
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="初期個体数" bind:value={$initSemiCount} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="アクション当たりの自然生存率(%)"
							bind:value={$semiSurvivalRate}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="初期最短寿命(年)" bind:value={$initSemiMinLife} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="初期最長寿命(年)" bind:value={$initSemiMaxLife} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="寿命突然変異率(%)" bind:value={$semiMutationRate} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最小産卵数" bind:value={$semiSpawningMin} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最大産卵数" bind:value={$semiSpawningMax} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="繁殖率" bind:value={$semiBreedingRate} textType="number" />
					</div>

					<div class="inline-block w-full py-1 md:w-[49%]"></div>
				</div>
			</Group>

			<Group title="その他の被食者">
				<div class="text-center">
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="初期個体数" bind:value={$initPreyCount} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text
							label="アクション当たりの自然生存率(%)"
							bind:value={$preySurvivalRate}
							textType="number"
						/>
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最小産卵数" bind:value={$preySpawningMin} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="最大産卵数" bind:value={$preySpawningMax} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="繁殖率" bind:value={$preyBreedingRate} textType="number" />
					</div>
					<div class="inline-block w-full py-1 md:w-[49%]">
						<Text label="適応数" bind:value={$preyAdoptCount} textType="number" />
					</div>

					<div class="inline-block w-full py-1 md:w-[49%]"></div>
				</div>
			</Group>

			<!--a href="/simulation">
				<input class="styled bg-slate-600 hover:bg-slate-500 active:bg-slate-400 text-white" type="button" value="シミュレーション開始">
			</a-->

			<input
				class="styled bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-400"
				type="button"
				value="生成"
				on:click={doSimulation}
			/>
			<input
				class="styled bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-400"
				type="button"
				value="1年シミュレーション"
				on:click={clock}
			/>

			<Group title="デバッグログ">
				<div class="text-center"></div>
			</Group>
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
