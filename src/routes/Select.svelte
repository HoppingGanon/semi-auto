<script lang="ts">
	export let value: number | undefined;
	export let items: string[] = [];
	export let label: string = ''; // デフォルトのラベルを設定

	const handleChange = (event: Event) => {
		const selectElement = event.target as HTMLSelectElement;
		value = selectElement.selectedIndex;
	};

	const id = `select-${crypto.randomUUID()}`;
</script>

<div class="input-container select-container">
	<select {id} on:change={handleChange} bind:value>
		{#each items as item, index}
			<option value={index}>{item}</option>
		{/each}
	</select>
	<label for={id}>{label}</label>
</div>

<style>
	.select-container {
		position: relative;
	}

	.select-container select {
		background-color: #0002;
		border-bottom: 1px solid #0007;
		border-radius: 5px;
		padding: 12px 8px 8px 8px;
		width: 100%;
		transition: all 0.2s;
		appearance: none; /* ネイティブのセレクトボックスのスタイルを無効にする */
	}

	.select-container label {
		position: absolute;
		left: 8px;
		top: 8px;
		transition: all 0.2s;
		opacity: 0.5;
		font-size: 1rem;
	}

	.select-container select:focus + label,
	.select-container select:not(:placeholder-shown) + label {
		top: -1px;
		font-size: 0.6rem;
		padding: 0 4px;
		opacity: 1;
	}

	.select-container select:focus {
		background-color: #0000;
		border-bottom: 1px solid #000;
	}
</style>
