<script>
	import Container from './Container.svelte';
	import Card from './Card.svelte';
	import Text from './Text.svelte';
	import Group from './Group.svelte';
	import './style.scss';

	$: test = '123';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Container>
		<Card title="環境設定">
			<Group title="環境設定">
				<Text className="inline-block" label="個体数" bind:value={test} />
	
				
				<Text className="inline-block w-full md:w-[40%] py-1" label="ターン数" bind:value={test} />
				<Text
					className="inline-block w-full md:w-[40%] py-1"
					label="1ターン当たりのアクション数"
					bind:value={test}
				/>

			</Group>
		</Card>

		<Card title="自然数セミ">
			<Text className="inline-block w-full md:w-[50%] py-1" label="個体数" bind:value={test} />
		</Card>
	</Container>
</section>

<style lang="scss">
	@import './style.scss';
</style>
