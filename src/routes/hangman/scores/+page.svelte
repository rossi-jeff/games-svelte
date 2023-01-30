<script lang="ts">
	import { HANG_MEN_PAGINATED } from '../../../graphql/queries/hang-men-paginated';
	import type { HangManResult } from '../../../graphql/types/hang-man-result';
	import { graphQlClient } from '../../../lib';
	import { onMount } from 'svelte';
	import HangManItems from './HangManItems.svelte';
	import Pagination from '../../Utilities/Pagination.svelte';
	import { Loader } from '$lib/loader';

	let skip: number = 0;
	let take: number = 10;
	let count: number = 0;
	let pagedResults: HangManResult = {};

	const getHangMen = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(HANG_MEN_PAGINATED, { Skip: skip, Take: take })
			.then((result) => {
				pagedResults = result.hangMen;
				skip = pagedResults.Skip ?? 0;
				take = pagedResults.Take ?? 10;
				count = pagedResults.Count ?? 0;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const pageChanged = (event: any) => {
		console.log(event.detail);
		const { PerPage, CurrentPage } = event.detail;
		if (PerPage && CurrentPage) {
			take = PerPage;
			skip = (CurrentPage - 1) * PerPage;
			getHangMen();
		}
	};

	onMount(() => {
		getHangMen();
	});
</script>

<svelte:head>
	<title>Hang Man</title>
</svelte:head>

<div class="hang-man-scores">
	<h2>Hangman Scores</h2>
	{#if pagedResults.Items && pagedResults.Items.length}
		<HangManItems items={pagedResults.Items} />
	{/if}
</div>

{#if pagedResults && pagedResults.Items && pagedResults.Items.length}
	<Pagination {take} {count} on:changePage={pageChanged} />
{/if}

<style>
	div.hang-man-scores {
		@apply mx-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
