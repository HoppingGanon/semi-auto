<script>
	import Card from './Card.svelte';
	import Text from './Text.svelte';
	import './style.scss';

	$: test = '123';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Card title="aaa">
		<Text className="inline-block w-full md:w-[50%] py-1" label="テキストラベル" bind:value={test} />

	</Card>
</section>

<style lang="scss">
	@import './style.scss';


</style>
