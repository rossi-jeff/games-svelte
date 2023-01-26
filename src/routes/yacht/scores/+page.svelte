<script lang="ts">
	import { onMount } from 'svelte';
	import { YACHTS_PAGINATED } from '../../../graphql/queries/yachts-paginated';
	import type { YachtResult } from '../../../graphql/types/yacht-result';
	import { graphQlClient } from '../../../lib';
	import Pagination from '../../Utilities/Pagination.svelte';
	import YachtItems from './YachtItems.svelte';

	let skip: number = 0;
	let take: number = 10;
	let count: number = 0;
	let pagedResults: YachtResult = {};

	const getYachts = () => {
		graphQlClient
			.request(YACHTS_PAGINATED, { Skip: skip, Take: take })
			.then((result) => {
				pagedResults = result.yachts;
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
			getYachts();
		}
	};

	onMount(() => {
		getYachts();
	});
</script>

<div class="yacht-scores">
	<h2>Yacht Scores</h2>
	{#if pagedResults.Items && pagedResults.Items.length}
		<YachtItems items={pagedResults.Items} />
	{/if}
</div>

{#if pagedResults && pagedResults.Items && pagedResults.Items.length}
	<Pagination {take} {count} on:changePage={pageChanged} />
{/if}

<style>
	div.yacht-scores {
		@apply mx-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
