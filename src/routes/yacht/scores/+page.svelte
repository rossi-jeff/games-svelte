<script lang="ts">
	import { onMount } from 'svelte';
	import { YACHTS_PAGINATED } from '../../../graphql/queries/yachts-paginated';
	import type { YachtResult } from '../../../graphql/types/yacht-result';
	import { graphQlClient } from '../../../lib';
	import YachtItems from './YachtItems.svelte';

	let skip = 0;
	let take = 10;
	let pagedResults: YachtResult = {};

	const getYachts = () => {
		graphQlClient
			.request(YACHTS_PAGINATED, { Skip: skip, Take: take })
			.then((result) => {
				pagedResults = result.yachts;
			})
			.catch((e) => console.error(e));
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

<style>
	div.yacht-scores {
		@apply mx-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
