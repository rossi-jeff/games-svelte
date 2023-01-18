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
		border-collapse: collapse;
		border-top: solid gray 1px;
		border-left: solid gray 1px;
	}
	table.ship-grid th {
		background-color: lightblue;
		font-weight: bold;
	}
	table.ship-grid td,
	table.ship-grid th {
		width: 2.5em;
		height: 2.5em;
		border-bottom: solid gray 1px;
		border-right: solid gray 1px;
	}
	:global(.occupied) {
		background-color: silver;
	}
	:global(.Hit),
	:global(.Sunk) {
		background-color: lightcoral;
	}
	:global(.Miss) {
		background-color: skyblue;
	}
	:global(.highlighted) {
		background-color: yellow;
	}
</style>
