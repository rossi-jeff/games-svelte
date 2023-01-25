<script lang="ts">
	import { graphQlClient } from '$lib';
	import { onMount } from 'svelte';
	import { SEA_BATTLES_PAGINATED } from '../../../graphql/queries/sea-battles-paginated';
	import type { SeaBattleResult } from '../../../graphql/types/sea-battle-result';
	import SeaBattleItems from './SeaBattleItems.svelte';

	let skip = 0;
	let take = 10;
	let pagedResults: SeaBattleResult = {};

	const getSeaBattles = () => {
		graphQlClient
			.request(SEA_BATTLES_PAGINATED, { Skip: skip, Take: take })
			.then((result) => {
				pagedResults = result.seaBattles;
			})
			.catch((e) => console.error(e));
	};

	onMount(() => {
		getSeaBattles();
	});
</script>

<div class="sea-battle-scores">
	<h2>Sea Battle Scores</h2>
	{#if pagedResults.Items && pagedResults.Items.length}
		<SeaBattleItems items={pagedResults.Items} />
	{/if}
</div>

<style>
	div.sea-battle-scores {
		@apply mx-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
