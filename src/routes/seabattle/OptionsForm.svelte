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

<div>
	<span>Grid Size</span>
	<select name="axis" id="axis-select" bind:value={axis} on:change={axisChanged}>
		{#each gridAxes as axe}
			<option value={axe}>{axe}</option>
		{/each}
	</select>
	<button on:click={startGame}>Start Game</button>
</div>
