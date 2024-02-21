<script lang="ts">
	export let className = '';
	export let title = '';
	export let bgColor = 'bg-white';
</script>

<section>
	{#if title}
		<div class="text-center">
			<div class="title">
				<div class={`title2 text-md px-5 font-bold ${bgColor}`}>
					{title}
				</div>
			</div>
		</div>
	{/if}
	<div class={`card mb-4 p-1 sm:p-2 md:p-3 ${className} ${bgColor}`}>
		<slot />
	</div>
</section>

<style lang="scss">
	@import './style.scss';

	div.title {
		margin-bottom: -10px;
	}

	div.title2 {
		display: inline-block;
	}

	div.card {
		width: 100%;
		border: 1px solid #c0c0c0;
		border-radius: 3px;

		@include media('sm') {
			border-radius: 5px;
		}
		@include media('md') {
			border-radius: 7px;
		}
	}
</style>
