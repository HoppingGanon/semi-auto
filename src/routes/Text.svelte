<script lang="ts">
	export let label = 'Label';
	export let value: string = '';
	export let className = '';
	export let textType: 'text' | 'number' = 'text';

	const setter = (event: Event) => {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement) {
			const v = inputElement.value;
			if (textType === 'text') {
				value = v;
			} else if (textType === 'number') {
				if (Number.isNaN(v)) {
					value = v;
				} else {
					value = v;
				}
			}
		}
	};

	$: displayedValue = textType === 'number' ? value.toString() : value;

	const id = `text-${crypto.randomUUID()}`;
</script>

<section>
	<div class={`${className} input-container w-full`}>
		<input {id} type={textType} value={displayedValue} placeholder=" " on:input={setter} />
		<label for={id}>{label}</label>
	</div>
</section>

<style>
	.input-container {
		position: relative;
	}

	.input-container input {
		background-color: #0002;
		border-bottom: 1px solid #0007;
		border-radius: 5px;
		padding: 12px 8px 8px 8px;
		width: 100%;
		transition: all 0.2s;
	}

	.input-container label {
		position: absolute;
		left: 8px;
		top: 8px;
		transition: all 0.2s;
		opacity: 0.5;
		font-size: 1rem;
	}

	.input-container input:focus + label,
	.input-container input:not(:placeholder-shown) + label {
		top: -1px;
		font-size: 0.6rem;
		padding: 0 4px;
		opacity: 1;
	}

	.input-container input:focus {
		background-color: #0000;
		border-bottom: 1px solid #000;
	}
</style>
