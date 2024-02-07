<script>
	import '../app.pcss';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer></footer>
</div>

<style lang="scss">
	@import './style.scss';

	main {
		// デフォルト(xs)スタイル
		font-size: 0.75rem;

		// smブレークポイントのスタイル
		@include media('sm') {
			font-size: 0.75rem;
		}

		// mdブレークポイントのスタイル
		@include media('md') {
			font-size: 0.75rem;
		}

		// lgブレークポイントのスタイル
		@include media('lg') {
			font-size: 1rem;
		}

		// xlブレークポイントのスタイル
		@include media('xl') {
			font-size: 1rem;
		}

		// 2xlブレークポイントのスタイル
		@include media('2xl') {
			font-size: 1rem;
		}
	}
</style>
