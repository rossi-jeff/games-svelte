<script lang="ts">
	import { Color } from '../../graphql/types/color';
	import { createEventDispatcher } from 'svelte';
	import { getColor } from '../../lib';

	let colors: string[] = Object.values(Color);
	let columns: number[] = [4, 5, 6, 7, 8];
	let selected: string[] = [];
	let column: number = 4;
	let all: boolean = false;

	const toggleAll = () => {
		all = all ? false : true;
		selected = all ? colors : [];
	};

	const dispatch = createEventDispatcher();

	const createGame = () => {
		if (selected.length < 2) return;
		let data = {
			colors: selected.map((c) => getColor(c)),
			columns: column,
			selected
		};
		dispatch('sendOptions', data);
	};
</script>

<div class="color-picker">
	<div class="White">
		<label for="columns-select">Columns</label>
		<select id="columns-select" bind:value={column}>
			{#each columns as col}
				<option value={col}>{col}</option>
			{/each}
		</select>
	</div>
	<div class="White">
		<input
			type="checkbox"
			name="select-all"
			id="select-all"
			bind:checked={all}
			on:click={toggleAll}
		/>
		<label for="select-all">All</label>
	</div>
	{#each colors as color}
		<div class={color}>
			<input type="checkbox" id="color-{color}" value={color} bind:group={selected} />
			<label for="color-{color}">
				{color}
			</label>
		</div>
	{/each}
	{#if selected.length > 1}
		<button class="start-button" on:click={createGame}>Start Game</button>
	{/if}
</div>

<style>
	div.color-picker {
		@apply flex flex-wrap p-2;
	}
	div.color-picker div {
		@apply mr-2 py-1 px-2 border rounded h-8;
	}
	.Black {
		@apply bg-black border-black text-white;
	}
	.Blue {
		@apply bg-blue-700 border-blue-900 text-white;
	}
	.Brown {
		@apply bg-amber-800 border-amber-900 text-white;
	}
	.Green {
		@apply bg-green-500 border-green-900;
	}
	.Orange {
		@apply bg-orange-400 border-orange-900;
	}
	.Purple {
		@apply bg-purple-600 border-purple-900;
	}
	.Red {
		@apply bg-red-600 border-red-900;
	}
	.White {
		@apply bg-white border-black;
	}
	.Yellow {
		@apply bg-yellow-300 border-yellow-900;
	}
	button.start-button {
		@apply bg-white border-black border rounded px-2 h-8;
	}
	button.start-button:hover {
		@apply bg-yellow-100;
	}
</style>
