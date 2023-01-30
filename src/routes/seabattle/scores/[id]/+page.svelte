<script lang="ts">
	import { page } from '$app/stores';
	import type { SeaBattle } from '../../../../graphql/types/sea-battle';
	import { BackwardSolid } from 'svelte-awesome-icons';
	import { graphQlClient } from '$lib';
	import { SEA_BATTLE } from '../../../../graphql/queries/sea-battle';
	import { onMount } from 'svelte';
	import type { SeaBattleShip } from '../../../../graphql/types/sea-battle-ship';
	import { Navy } from '../../../../graphql/types/navy';
	import ShipDisplay from '../../ShipDisplay.svelte';

	let id = $page.params.id;
	console.log({ id });

	let game: SeaBattle = {};
	let ships: SeaBattleShip[] = [];
	let playerShips: SeaBattleShip[] = [];
	let opponentShips: SeaBattleShip[] = [];

	const getSeaBattle = () => {
		graphQlClient
			.request(SEA_BATTLE, { id: parseInt(String(id)) })
			.then((result) => {
				game = result.seaBattle;
				if (game.Ships) ships = game.Ships;
				playerShips = ships.filter((s) => s.Navy === Navy.Player);
				opponentShips = ships.filter((s) => s.Navy === Navy.Opponent);
			})
			.catch((e) => console.error(e));
	};

	onMount(() => {
		getSeaBattle();
	});
</script>

<svelte:head>
	<title>Sea Battle</title>
</svelte:head>

<div class="back-link">
	<a href="/seabattle/scores">
		<BackwardSolid class="mr-2" /> BACK
	</a>
</div>

<div class="sea-battle">
	<div class="mb-2">
		<strong>User</strong>
		{game.User ? game.User.UserName : 'Anonymous'}
	</div>

	<div class="mb-2">
		<strong>Status</strong>
		{#if game.Status}
			{game.Status}
		{/if}
	</div>

	<div class="mb-2">
		<strong>Score</strong>
		{#if game.Score}
			{game.Score}
		{/if}
	</div>

	<h2>Player Ships</h2>
	<div class="player-ships">
		{#if playerShips.length}
			{#each playerShips as ship}
				<ShipDisplay {ship} />
			{/each}
		{/if}
	</div>

	<h2>Opponent Ships</h2>
	<div class="opponent-ships">
		{#if opponentShips.length}
			{#each opponentShips as ship}
				<ShipDisplay {ship} />
			{/each}
		{/if}
	</div>
</div>

<style>
	div.back-link {
		@apply mx-2 mb-4;
	}
	div.back-link a {
		@apply flex;
	}
	div.sea-battle {
		@apply mx-2 border border-black rounded p-2;
	}
	div.player-ships,
	div.opponent-ships {
		@apply flex flex-wrap justify-between mb-4;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
