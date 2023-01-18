<script lang="ts">
	import { alphabet } from "$lib";
	import type { SeaBattle } from "../../graphql/types/sea-battle";

    export let game: SeaBattle = {};
    export let axis: number = 8;

    const H = alphabet.toUpperCase().split('');
	const V = [...Array(26).keys()].map((x) => x + 1);
	const horizontal: string[] = H.slice(0, axis);
	const vertical: number[] = V.slice(0, axis);
	let directions = ['right', 'down', 'left', 'up'];
</script>

<table>
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
            </th>
        </tr>
    </tfoot>
</table>

{JSON.stringify(game)}