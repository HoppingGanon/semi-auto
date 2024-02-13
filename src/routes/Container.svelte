<script lang="ts">
	export let className = '';
</script>

<section>
	<div class="flex w-full items-center justify-center p-1 sm:p-2 md:p-3">
		<div class={`${className} wrapper`}>
			<slot />
		</div>
	</div>
</section>

<style lang="scss">
	@import './style.scss';

	div.wrapper {
		width: 100%;

		@include media('sm') {
			width: 460px;
		}
		@include media('md') {
			width: 760px;
		}
	}
</style>
