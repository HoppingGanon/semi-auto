<script lang="ts">
	export let className = '';
	export let title = '';
</script>

<section>
	<div class="wrapper flex w-full items-center justify-center p-1 sm:p-2 md:p-3 font-bold text-lg">
		<div class={`card p-1 sm:p-2 md:p-3 ${className}`}>
			{#if title}
				<div class="title pb-2">
					{title}
          <div class="pb-2 border-b border-grey"></div>
				</div>
			{/if}
			<slot />
		</div>
	</div>
</section>

<style lang="scss">
	@import './style.scss';

	div.wrapper {
		position: absolute;
		top: 0px;
		left: 0px;
	}

	div.card {
		width: 100%;
		border: 1px solid #c0c0c0;
		border-radius: 3px;
		box-shadow: 0px 2px 2px #c0c0c0;

		@include media('sm') {
			width: 460px;
			border-radius: 5px;
			box-shadow: 0px 4px 4px #c0c0c0;
		}
		@include media('md') {
			width: 760px;
			border-radius: 7px;
			box-shadow: 0px 6px 6px #c0c0c0;
		}
		@include media('lg') {
			width: 760px;
			border-radius: 7px;
		}
		@include media('xl') {
			width: 760px;
			border-radius: 7px;
		}
		@include media('2xl') {
			width: 760px;
			border-radius: 7px;
		}
	}

	div.title {
		text-align: center;
	}
</style>
