<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const gridAxes: number[] = [6, 7, 8, 9, 10, 11, 12];
	let axis: number = 8;

	const dispatch = createEventDispatcher();

	const axisChanged = () => {
		dispatch('setAxis', axis);
	};

	const startGame = () => {
		dispatch('startGame');
	};
</script>

<div class="options-form">
	<h2>Game Options</h2>
	<div class="options-container">
		<span>Grid Size</span>
		<select name="axis" id="axis-select" bind:value={axis} on:change={axisChanged}>
			{#each gridAxes as axe}
				<option value={axe}>{axe}</option>
			{/each}
		</select>
		<button on:click={startGame}>Start Game</button>
	</div>
</div>

<style>
	div.options-form {
		@apply border rounded border-black mx-2 p-2;
	}
	div.options-container {
		@apply flex flex-wrap;
	}
	div.options-form select {
		@apply ml-2 border border-black rounded py-1 px-1 bg-white;
	}
	div.options-form button {
		@apply ml-2 py-1 px-2 border rounded border-black;
	}
	div.options-form button:hover {
		@apply bg-blue-200;
	}
	h2 {
		@apply text-lg font-bold;
	}
</style>
