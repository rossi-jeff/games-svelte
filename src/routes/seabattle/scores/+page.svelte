<script lang="ts">
	import { graphQlClient } from '$lib';
	import { onMount } from 'svelte';
	import { SEA_BATTLES_PAGINATED } from '../../../graphql/queries/sea-battles-paginated';
	import type { SeaBattleResult } from '../../../graphql/types/sea-battle-result';
	import Pagination from '../../Utilities/Pagination.svelte';
	import SeaBattleItems from './SeaBattleItems.svelte';

	let skip: number = 0;
	let take: number = 10;
	let count: number = 0;
	let pagedResults: SeaBattleResult = {};

	const getSeaBattles = () => {
		graphQlClient
			.request(SEA_BATTLES_PAGINATED, { Skip: skip, Take: take })
			.then((result) => {
				pagedResults = result.seaBattles;
				skip = pagedResults.Skip ?? 0;
				take = pagedResults.Take ?? 10;
				count = pagedResults.Count ?? 0;
			})
			.catch((e) => console.error(e));
	};

	const pageChanged = (event: any) => {
		console.log(event.detail);
		const { PerPage, CurrentPage } = event.detail;
		if (PerPage && CurrentPage) {
			take = PerPage;
			skip = (CurrentPage - 1) * PerPage;
			getSeaBattles();
		}
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

{#if pagedResults && pagedResults.Items && pagedResults.Items.length}
	<Pagination {take} {count} on:changePage={pageChanged} />
{/if}

<style>
	div.sea-battle-scores {
		@apply mx-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
