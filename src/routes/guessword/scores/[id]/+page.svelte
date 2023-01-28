<script lang="ts">
	import { page } from '$app/stores';
	import { BackwardSolid } from 'svelte-awesome-icons';
	import { onMount } from 'svelte';
	import { GUESS_WORD } from '../../../../graphql/queries/guess-word';
	import type { GuessWord } from '../../../../graphql/types/guess-word';
	import { graphQlClient } from '../../../../lib';
	import { Loader } from '../../../../lib/loader';
	import GuessDisplay from '../../GuessDisplay.svelte';

	let id = $page.params.id;
	console.log({ id });

	let game: GuessWord = {};

	const getGuessWord = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(GUESS_WORD, { id: parseInt(String(id)) })
			.then((result) => {
				game = result.guessWord;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	onMount(() => {
		getGuessWord();
	});
</script>

<div class="back-link">
	<a href="/guessword/scores">
		<BackwardSolid class="mr-2" /> BACK
	</a>
</div>

<div class="guess-word">
	<div class="mb-2">
		<strong>User</strong>
		{game.User ? game.User.UserName : 'Anonymous'}
	</div>

	<div class="mb-2">
		<strong>Word</strong>
		{game.Word ? game.Word.Word : ''}
	</div>

	<div class="mb-2">
		<strong>Status</strong>
		{game.Status}
	</div>

	<div class="mb-2">
		<strong>Score</strong>
		{game.Score}
	</div>

	{#if game.Guesses && game.Guesses.length}
		<h2>Guesses</h2>
		{#each game.Guesses as guess}
			<GuessDisplay {guess} />
		{/each}
	{/if}
</div>

<style>
	div.back-link {
		@apply mx-2 mb-4;
	}
	div.back-link a {
		@apply flex;
	}
	div.guess-word {
		@apply mx-2 border border-black rounded p-2;
	}
	h2 {
		@apply text-lg font-bold;
	}
</style>
