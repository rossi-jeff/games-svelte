<script lang="ts">
	import type { GridPoint } from '../../graphql/types/grid-point';
	import type { SeaBattleShip } from '../../graphql/types/sea-battle-ship';

	export let ship: SeaBattleShip = {};

	const isHit = (point: GridPoint) => {
		if (!ship.Hits || !ship.Hits.length) return 'OK';
		let idx: number = ship.Hits.findIndex(
			(h) => h.Horizontal === point.Horizontal && h.Vertical === point.Vertical
		);
		if (idx != -1) return 'Hit';
		return 'OK';
	};
</script>

<div class="sea-battle-ship">
	<div class="ship-image">
		{#if ship.GridPoints && ship.GridPoints.length}
			{#each ship.GridPoints as point}
				<div class={isHit(point)}>
					<span />
				</div>
			{/each}
		{/if}
	</div>
	<div>{ship.Type}</div>
</div>

<style>
	div.sea-battle-ship {
		@apply border border-black rounded p-2 text-center;
	}
	div.ship-image {
		@apply flex border-gray-800;
	}
	div.ship-image div {
		@apply bg-gray-500 w-10 h-10;
	}
	:global(div.Hit span) {
		@apply bg-red-500 w-6 h-6 rounded-full my-2;
	}
</style>
