<script lang="ts">
	import { alphabet } from "$lib";
	import type { SeaBattle } from "../../graphql/types/sea-battle";
	import { onMount, createEventDispatcher } from 'svelte'
	import type { SeaBattleTurn } from "../../graphql/types/sea-battle-turn";

    export let game: SeaBattle = {};
    export let axis: number = 8;

	console.log(game)

    const H = alphabet.toUpperCase().split('');
	const V = [...Array(26).keys()].map((x) => x + 1);
	const horizontal: string[] = H.slice(0, axis);
	const vertical: number[] = V.slice(0, axis);
	let highlighted: string
	let turns: SeaBattleTurn[] = []
	let occupied: string[] = []

	let point = {
		horizontal: horizontal[0],
		vertical: vertical[0],
	}

	const dispatch = createEventDispatcher()

	const highLightPoint = () => {
		let el: any
		if (highlighted) {
			el = document.getElementById(highlighted)
			if (el) el.classList.remove('highlighted')
		}
		highlighted = `${point.horizontal}-${point.vertical}`
		el = document.getElementById(highlighted)
		if (el) el.classList.add('highlighted')
	}

	const sendPoint = () => {
		dispatch('sendPoint', point)
		if (highlighted) {
			let el = document.getElementById(highlighted)
			if (el) el.classList.remove('highlighted')
			highlighted = ''
		}
		point.horizontal = horizontal[0]
		point.vertical = vertical[0]
	}

	if (game.Turns) {
		let cellId: string, el: any
		while (occupied.length) {
			let shifted = occupied.shift()
			if (!shifted) continue
			cellId = shifted
			el = document.getElementById(cellId)
			if (el) {
				el.classList.remove('Hit')
				el.classList.remove('Sunk')
				el.classList.remove('Miss')
			}
		}
		turns = game.Turns.filter(t => t.Navy === 'Player')
		for (let turn of turns) {
			if (!turn.GridPoint || !turn.GridPoint.Horizontal || !turn.GridPoint.Vertical) continue
			const { Horizontal, Vertical } = turn.GridPoint
			cellId = `${Horizontal}-${Vertical}`
			el = document.getElementById(cellId)
			if (el) el.classList.add(turn.Target)
		}
	}

	onMount(() => highLightPoint())
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
					<td id="{h}-{v}" />
				{/each}
			</tr>
		{/each}
	</tbody>
    <tfoot>
        <tr>
            <th colspan={axis + 1}>
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
            </th>
        </tr>
    </tfoot>
</table>

<style>
    table.target-grid {
		border-collapse: collapse;
		border-top: solid gray 1px;
		border-left: solid gray 1px;
	}
	table.target-grid th {
		background-color: lightblue;
		font-weight: bold;
	}
	table.target-grid td,
	table.target-grid th {
		width: 2.5em;
		height: 2.5em;
		border-bottom: solid gray 1px;
		border-right: solid gray 1px;
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