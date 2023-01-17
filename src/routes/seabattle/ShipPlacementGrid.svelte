<script lang="ts">
	import { alphabet } from '../../lib';
	import { onMount, createEventDispatcher } from 'svelte';

	export let axis: number = 8;
	export let shipsToPlace: string[] = [];
	export let editShips: boolean = false;

	const H = alphabet.toUpperCase().split('');
	const V = [...Array(26).keys()].map((x) => x + 1);
	const horizontal: string[] = H.slice(0, axis);
	const vertical: number[] = V.slice(0, axis);
	let directions = ['right', 'down', 'left', 'up'];
	let highlighted: string[] = [];
	const sizes: { [key: string]: number } = {
		Carrier: 5,
		BattleShip: 4,
		Cruiser: 3,
		SubMarine: 3,
		PatrolBoat: 2
	};
	let occupied: string[] = [];
	let errors: string[] = [];

	let start = {
		type: shipsToPlace[0],
		horizontal: horizontal[0],
		vertical: vertical[0],
		direction: directions[0]
	};

	let ship: { type: string; points: { Horizontal: string; Vertical: number }[] } = {
		type: shipsToPlace[0],
		points: []
	};

	const dispatch = createEventDispatcher();

	const highlightShip = () => {
		let cellId: string;
		while (highlighted.length) {
			let shifted = highlighted.shift();
			if (!shifted) continue;
			cellId = shifted;
			let el = document.getElementById(cellId);
			if (el) el.classList.remove('highlighted');
		}
		const { type, horizontal: h, vertical: v, direction: d } = start;
		let idxH = horizontal.indexOf(h);
		let idxV = vertical.indexOf(v);
		let size = sizes[type];
		errors = [];
		for (let i = 0; i < size; i++) {
			if (!horizontal[idxH] || !vertical[idxV]) {
				errors.push('Ship Extends Beyond Grid');
				continue;
			}
			cellId = `${horizontal[idxH]}-${vertical[idxV]}`;
			if (occupied.indexOf(cellId) != -1) errors.push('Ship Overlaps Existing Ship');
			let el = document.getElementById(cellId);
			if (el) {
				el.classList.add('highlighted');
				highlighted.push(cellId);
			}
			switch (d) {
				case 'right':
					idxH++;
					break;
				case 'down':
					idxV++;
					break;
				case 'left':
					idxH--;
					break;
				case 'up':
					idxV--;
					break;
			}
		}
	};

	const saveShip = () => {
		let cellId: string;
		ship.points = [];
		ship.type = start.type;
		while (highlighted.length) {
			let shifted = highlighted.shift();
			if (!shifted) continue;
			cellId = shifted;
			let el = document.getElementById(cellId);
			if (el) {
				el.classList.remove('highlighted');
				el.classList.add('occupied');
				occupied.push(cellId);
				const [Horizontal, Vertical] = cellId.split('-');
				ship.points.push({ Horizontal, Vertical: parseInt(Vertical) });
			}
		}
		start.type = shipsToPlace[0];
		start.horizontal = horizontal[0];
		start.vertical = vertical[0];
		start.direction = directions[0];
		dispatch('saveShip', ship);
	};

	onMount(() => highlightShip());
</script>

<table class="placement-grid">
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
					<td id="{h}-{v}" />
				{/each}
			</tr>
		{/each}
	</tbody>
	{#if editShips}
		<tfoot>
			<tr>
				<th colspan={axis + 1}>
					<span>
						<strong>Ship</strong>
						<select name="ship" id="ship select" bind:value={start.type} on:change={highlightShip}>
							{#each shipsToPlace as shipType}
								<option value={shipType}>{shipType}</option>
							{/each}
						</select>
					</span>
					<span>
						<strong>Start</strong>
						<select
							name="horizontal"
							id="horizontal-select"
							bind:value={start.horizontal}
							on:change={highlightShip}
						>
							{#each horizontal as h}
								<option value={h}>{h}</option>
							{/each}
						</select>
						<select
							name="vertical"
							id="vertical-select"
							bind:value={start.vertical}
							on:change={highlightShip}
						>
							{#each vertical as v}
								<option value={v}>{v}</option>
							{/each}
						</select>
					</span>
					<span>
						<strong>Direction</strong>
						<select
							name="direction"
							id="direction-select"
							bind:value={start.direction}
							on:change={highlightShip}
						>
							{#each directions as d}
								<option value={d}>{d}</option>
							{/each}
						</select>
					</span>
				</th>
			</tr>
			<tr>
				<th colspan={axis + 1}>
					{#if errors && errors.length > 0}
						<ul>
							{#each errors as e}
								<li>{e}</li>
							{/each}
						</ul>
					{:else}
						<button on:click={saveShip}>Save Ship</button>
					{/if}
				</th>
			</tr>
		</tfoot>
	{/if}
</table>

<style>
	table.placement-grid {
		border-collapse: collapse;
		border-top: solid gray 1px;
		border-left: solid gray 1px;
	}
	table.placement-grid th {
		background-color: lightblue;
		font-weight: bold;
	}
	table.placement-grid td,
	table.placement-grid th {
		width: 2.5em;
		height: 2.5em;
		border-bottom: solid gray 1px;
		border-right: solid gray 1px;
	}
	select {
		font-size: small;
	}
	:global(.highlighted) {
		background-color: yellow;
	}
	:global(.occupied) {
		background-color: silver;
	}
</style>
