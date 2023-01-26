<script lang="ts">
	import { GUESS_WORDS_PAGINATED } from '../../../graphql/queries/guess-words-paginated';
	import type { GuessWordResult } from '../../../graphql/types/guess-word-result';
	import { graphQlClient } from '../../../lib';
	import { onMount } from 'svelte';
	import GuessWordItems from './GuessWordItems.svelte';

	let skip = 0;
	let take = 10;
	let pagedResults: GuessWordResult = {};

	const getGuessWords = () => {
		graphQlClient
			.request(GUESS_WORDS_PAGINATED, { Skip: skip, Take: take })
			.then((result) => {
				pagedResults = result.guessWords;
			})
			.catch((e) => console.error(e));
	};

	onMount(() => {
		getGuessWords();
	});
</script>

<div class="guess-word-scores">
	<h2>Guess Word Scores</h2>
	{#if pagedResults && pagedResults.Items && pagedResults.Items.length}
		<GuessWordItems items={pagedResults.Items} />
	{/if}
</div>

<style>
	div.guess-word-scores {
		@apply mx-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
