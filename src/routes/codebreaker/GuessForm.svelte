<script lang="ts">
	import { getColor } from '../../lib/get-color';
	import { createEventDispatcher } from 'svelte';
	import ColorSelect from './ColorSelect.svelte';

	export let availableColors: string[];
	export let availableColumns: number;

	let selected: string[] = [];
	let complete: boolean = false;

	const dispatch = createEventDispatcher();

	const checkComplete = () => {
		let valid: boolean = true;
		for (let color of selected) {
			if (!color || color.length === 0) valid = false;
		}
		complete = valid;
	};

	const clearSelected = () => {
		for (let i = 0; i < selected.length; i++) selected[i] = '';
		complete = false;
	};

	const createGuess = () => {
		let data = {
			colors: selected.map((s) => getColor(s))
		};
		dispatch('sendGuess', data);
		clearSelected();
	};
</script>

<div class="guess-form">
	{#each Array(availableColumns) as _, i (i)}
		<div id="column-{i}">
			<ColorSelect {availableColors} {i} {selected} on:checkComplete={checkComplete} />
		</div>
	{/each}
	{#if complete}
		<button class="guess" on:click={createGuess}>Guess</button>
	{/if}
</div>

<style>
	div.guess-form {
		@apply flex flex-wrap p-2 border border-black rounded mx-2 mb-2;
	}
	div.guess-form div {
		@apply bg-white border border-black rounded py-1 px-2 mr-2 h-8;
	}
	button.guess {
		@apply bg-white border-black border rounded px-2 h-8;
	}
	button.guess:hover {
		@apply bg-yellow-100;
	}
</style>
