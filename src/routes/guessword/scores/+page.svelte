<script lang="ts">
	import { GUESS_WORDS_PAGINATED } from '../../../graphql/queries/guess-words-paginated';
	import type { GuessWordResult } from '../../../graphql/types/guess-word-result';
	import { graphQlClient } from '../../../lib';
	import { onMount } from 'svelte';
	import GuessWordItems from './GuessWordItems.svelte';
	import Pagination from '../../Utilities/Pagination.svelte';
	import { Loader } from '$lib/loader';

	let skip: number = 0;
	let take: number = 10;
	let count: number = 0;
	let pagedResults: GuessWordResult = {};

	const getGuessWords = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(GUESS_WORDS_PAGINATED, { Skip: skip, Take: take })
			.then((result) => {
				pagedResults = result.guessWords;
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
			getGuessWords();
		}
	};

	onMount(() => {
		getGuessWords();
	});
</script>

<svelte:head>
	<title>Guess Word</title>
</svelte:head>

<div class="guess-word-scores">
	<h2>Guess Word Scores</h2>
	{#if pagedResults && pagedResults.Items && pagedResults.Items.length}
		<GuessWordItems items={pagedResults.Items} />
	{/if}
</div>

{#if pagedResults && pagedResults.Items && pagedResults.Items.length}
	<Pagination {take} {count} on:changePage={pageChanged} />
{/if}

<style>
	div.guess-word-scores {
		@apply mx-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
