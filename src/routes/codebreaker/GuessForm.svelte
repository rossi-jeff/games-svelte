<script lang="ts">
	import { getColor } from '../../lib/get-color';
	import { createEventDispatcher } from 'svelte';

	export let availableColors: string[];
	export let availableColumns: number;

	let selected: string[] = [];
	let complete: boolean = false;

	const dispatch = createEventDispatcher();

	const checkComplete = (event: any) => {
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
			<select id="select-{i}" bind:value={selected[i]} on:change={checkComplete}>
				<option value=""> - select - </option>
				{#each availableColors as color}
					<option value={color}>{color}</option>
				{/each}
			</select>
		</div>
	{/each}
	{#if complete}
		<button class="guess" on:click={createGuess}>Send Guess</button>
	{/if}
</div>

<style>
	div.guess-form {
		@apply flex flex-wrap p-2;
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
	:global(.Black) {
		@apply bg-black border-black text-white h-8;
	}
	:global(.Blue) {
		@apply bg-blue-700 border-blue-900 text-white;
	}
	:global(.Brown) {
		@apply bg-amber-800 border-amber-900 text-white;
	}
	:global(.Green) {
		@apply bg-green-500 border-green-900;
	}
	:global(.Orange) {
		@apply bg-orange-400 border-orange-900;
	}
	:global(.Purple) {
		@apply bg-purple-600 border-purple-900;
	}
	:global(.Red) {
		@apply bg-red-600 border-red-900;
	}
	:global(.White) {
		@apply bg-white border-black;
	}
	:global(.Yellow) {
		@apply bg-yellow-300 border-yellow-900;
	}
</style>
