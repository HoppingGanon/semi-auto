<script lang="ts">
	export let className = '';
	export let title = '';
</script>

<section>
	<div class={`card mb-4 p-1 sm:p-2 md:p-3 ${className}`}>
		{#if title}
			<div class="pb-2 text-center text-lg font-bold">
				{title}
				<div class="border-b border-grey pb-2"></div>
			</div>
		{/if}
		<slot />
	</div>
</section>

<style lang="scss">
	@import './style.scss';

	div.card {
		width: 100%;
		border: 1px solid #c0c0c0;
		border-radius: 3px;
		box-shadow: 0px 2px 2px #c0c0c0;

		@include media('sm') {
			border-radius: 5px;
			box-shadow: 0px 4px 4px #c0c0c0;
		}
		@include media('md') {
			border-radius: 7px;
			box-shadow: 0px 6px 6px #c0c0c0;
		}
	}
</style>
