<script lang="ts">
	import { HANG_MEN_PAGINATED } from '../../../graphql/queries/hang-men-paginated';
	import type { HangManResult } from '../../../graphql/types/hang-man-result';
	import { graphQlClient } from '../../../lib';
	import { onMount } from 'svelte';
	import HangManItems from './HangManItems.svelte';

	let skip = 0;
	let take = 10;
	let pagedResults: HangManResult = {};

	const getHangMen = () => {
		graphQlClient
			.request(HANG_MEN_PAGINATED, { Skip: skip, Take: take })
			.then((result) => {
				pagedResults = result.hangMen;
			})
			.catch((e) => console.error(e));
	};

	onMount(() => {
		getHangMen();
	});
</script>

<div class="hang-man-scores">
	<h2>Hangman Scores</h2>
	{#if pagedResults.Items && pagedResults.Items.length}
		<HangManItems items={pagedResults.Items} />
	{/if}
</div>

<style>
	div.hang-man-scores {
		@apply mx-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
