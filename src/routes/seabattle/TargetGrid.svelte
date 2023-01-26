<script lang="ts">
	import { alphabet } from '$lib';
	import { onMount, createEventDispatcher } from 'svelte';
	import type { SeaBattleTurn } from '../../graphql/types/sea-battle-turn';

	export let axis: number = 8;
	export let playerFired: boolean = false;

	const H = alphabet.toUpperCase().split('');
	const V = [...Array(26).keys()].map((x) => x + 1);
	const horizontal: string[] = H.slice(0, axis);
	const vertical: number[] = V.slice(0, axis);
	let highlighted: string;
	let occupied: string[] = [];

	let point = {
		horizontal: horizontal[0],
		vertical: vertical[0]
	};

	const dispatch = createEventDispatcher();

	const highLightPoint = () => {
		let el: any;
		if (highlighted) {
			el = document.getElementById(highlighted);
			if (el) el.classList.remove('highlighted');
		}
		highlighted = `T-${point.horizontal}-${point.vertical}`;
		el = document.getElementById(highlighted);
		if (el) el.classList.add('highlighted');
	};

	const sendPoint = () => {
		if (highlighted && occupied.indexOf(highlighted) != -1)
			return alert(`Already fired at ${highlighted}`);
		dispatch('sendPoint', point);
		if (highlighted) {
			let el = document.getElementById(highlighted);
			if (el) el.classList.remove('highlighted');
			highlighted = '';
		}
		point.horizontal = horizontal[0];
		point.vertical = vertical[0];
	};

	export const displayTurns = (gameTurns: SeaBattleTurn[]) => {
		console.log('displayTurns');
		if (gameTurns) {
			let cellId: string, el: any;
			while (occupied.length) {
				let shifted = occupied.shift();
				if (!shifted) continue;
				cellId = shifted;
				el = document.getElementById(cellId);
				if (el) {
					el.classList.remove('Hit');
					el.classList.remove('Sunk');
					el.classList.remove('Miss');
				}
			}
			let turns = gameTurns.filter((t) => t.Navy === 'Player');
			console.log(turns);
			for (let turn of turns) {
				if (!turn.GridPoint || !turn.GridPoint.Horizontal || !turn.GridPoint.Vertical) continue;
				const { Horizontal, Vertical } = turn.GridPoint;
				cellId = `T-${Horizontal}-${Vertical}`;
				el = document.getElementById(cellId);
				if (el) el.classList.add(turn.Target);
				occupied.push(cellId);
			}
		}
	};

	const nextTurn = () => {
		dispatch('nextTurn');
	};

	onMount(() => highLightPoint());
</script>

<table class="target-grid">
	<thead>
		<tr>
			<th />
			{#each horizontal as h}
				<th>{h}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each vertical as v}
			<tr>
				<th>{v}</th>
				{#each horizontal as h}
					<td id="T-{h}-{v}">
						<span />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<th colspan={axis + 1}>
				{#if playerFired}
					<button on:click={nextTurn}>Continue</button>
				{:else}
					<span>
						<strong>Point</strong>
						<select
							name="horizontal"
							id="horizontal-select"
							bind:value={point.horizontal}
							on:change={highLightPoint}
						>
							{#each horizontal as h}
								<option value={h}>{h}</option>
							{/each}
						</select>
						<select
							name="vertical"
							id="vertical-select"
							bind:value={point.vertical}
							on:change={highLightPoint}
						>
							{#each vertical as v}
								<option value={v}>{v}</option>
							{/each}
						</select>
					</span>
					<button on:click={sendPoint}>Fire</button>
				{/if}
			</th>
		</tr>
	</tfoot>
</table>

<style>
	table.target-grid {
		@apply table-auto border-collapse border mx-2;
	}
	table.target-grid th {
		@apply bg-blue-300 font-bold;
	}
	table.target-grid td,
	table.target-grid th {
		@apply w-12 h-12 border border-gray-500 text-center;
	}
	select {
		@apply border border-black rounded py-1 px-0 bg-white text-sm;
	}
	:global(.Hit span),
	:global(.Sunk span) {
		@apply bg-red-400 rounded-full h-8 w-8 inline-block;
	}
	:global(.Miss span) {
		@apply bg-blue-400 rounded-full h-8 w-8 inline-block;
	}
	:global(.highlighted) {
		@apply bg-yellow-200;
	}
	button:hover {
		@apply text-red-500;
	}
</style>
