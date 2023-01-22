<script lang="ts">
	import { alphabet } from '$lib';
	import type { SeaBattleShip } from '../../graphql/types/sea-battle-ship';
	import type { SeaBattleTurn } from '../../graphql/types/sea-battle-turn';
	import { createEventDispatcher } from 'svelte';

	export let axis: number = 8;
	export let opponentFired: boolean = false;

	const H = alphabet.toUpperCase().split('');
	const V = [...Array(26).keys()].map((x) => x + 1);
	const horizontal: string[] = H.slice(0, axis);
	const vertical: number[] = V.slice(0, axis);

	const dispatch = createEventDispatcher();

	export const displayShips = (gameShips: SeaBattleShip[]) => {
		console.log('displayShips');
		if (gameShips && gameShips.length) {
			let cellId: string, el: any;
			let ships = gameShips.filter((s) => s.Navy === 'Player');
			console.log(ships);
			for (let ship of ships) {
				if (ship.GridPoints) {
					for (let point of ship.GridPoints) {
						if (!point.Horizontal || !point.Vertical) continue;
						const { Horizontal, Vertical } = point;
						cellId = `S-${Horizontal}-${Vertical}`;
						el = document.getElementById(cellId);
						if (el) el.classList.add('occupied');
					}
				}
			}
		}
	};

	export const displayTurns = (gameTurns: SeaBattleTurn[]) => {
		console.log('displayTurns');
		if (gameTurns && gameTurns.length) {
			let cellId: string, el: any;
			let turns = gameTurns.filter((t) => t.Navy === 'Opponent');
			console.log(turns);
			for (let turn of turns) {
				if (!turn.GridPoint || !turn.GridPoint.Horizontal || !turn.GridPoint.Vertical) continue;
				const { Horizontal, Vertical } = turn.GridPoint;
				cellId = `S-${Horizontal}-${Vertical}`;
				el = document.getElementById(cellId);
				if (el) el.classList.add(turn.Target);
			}
		}
	};

	const opponentFire = () => {
		dispatch('opponentFire');
	};

	const nextTurn = () => {
		dispatch('nextTurn');
	};
</script>

<table class="ship-grid">
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
					<td id="S-{h}-{v}" />
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<th colspan={axis + 1}>
				{#if opponentFired}
					<button on:click={nextTurn}>Continue</button>
				{:else}
					<button on:click={opponentFire}>Opponent Turn</button>
				{/if}
			</th>
		</tr>
	</tfoot>
</table>

<style>
	table.ship-grid {
		@apply table-auto border-collapse border border-gray-500 mx-2;
	}
	table.ship-grid th {
		@apply bg-blue-300 font-bold;
	}
	table.ship-grid td,
	table.ship-grid th {
		@apply w-12 h-12 border border-b-gray-500 border-r-gray-500;
	}
	:global(.occupied) {
		@apply bg-slate-400;
	}
	:global(.Hit),
	:global(.Sunk) {
		@apply bg-red-400;
	}
	:global(.Miss) {
		@apply bg-blue-400;
	}
	:global(.highlighted) {
		@apply bg-yellow-200;
	}
</style>
