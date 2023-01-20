<script lang="ts">
	import { graphQlClient } from '../../lib';
	import { onMount } from 'svelte';
	import { WORD_RANDOM } from '../../graphql/queries/word-random';
	import type { Word } from '../../graphql/types/word';
	import type { GuessWord } from '../../graphql/types/guess-word';
	import { GUESS_WORD_CREATE } from '../../graphql/mutations/guess-word-create';
	import GuessForm from './GuessForm.svelte';
	import GuessList from './GuessList.svelte';
	import { GUESS_WORD_GUESS } from '../../graphql/mutations/guess-word-guess';
	import { GameStatus } from '../../graphql/types/game-status';

	let word: Word = {};
	let game: GuessWord = {};
	let wordLoaded: boolean = false;
	let gameLoaded: boolean = false;

	const lengths = [4, 5, 6, 7, 8, 9, 10, 11, 12];
	const filter = {
		Length: 5
	};

	const getWord = () => {
		graphQlClient
			.request(WORD_RANDOM, { filter })
			.then((result) => {
				// console.log(result);
				word = result.wordRandom;
				wordLoaded = true;
				gameLoaded = false;
				createGame();
			})
			.catch((e) => console.error(e));
	};

	const createGame = () => {
		graphQlClient
			.request(GUESS_WORD_CREATE, { wordId: word.Id })
			.then((result) => {
				// console.log(result)
				game = result.guessWordCreate;
				gameLoaded = true;
			})
			.catch((e) => console.error(e));
	};

	const createGuess = (event: any) => {
		const { Guess } = event.detail;
		gameLoaded = false;
		graphQlClient
			.request(GUESS_WORD_GUESS, { id: game.Id, guess: Guess })
			.then((result) => {
				game = result.guessWordGuess;
				console.log(game.Word?.Word);
				gameLoaded = true;
				if (game.Status != 'Playing') wordLoaded = false;
			})
			.catch((e) => console.error(e));
	};

	const lengthChanged = () => {
		wordLoaded = false;
		getWord();
	};

	onMount(() => getWord());
</script>

{#if gameLoaded}
	<GuessList {game} />
{/if}

<div class="form-container">
	{#if wordLoaded}
		<GuessForm length={filter.Length} {wordLoaded} on:sendGuess={createGuess} />
	{/if}
</div>

{#if !game.Status || (game.Status && game.Status != GameStatus.Playing)}
	<div class="new-word">
		<select name="length" id="length" bind:value={filter.Length} on:change={lengthChanged}>
			{#each lengths as l}
				<option value={l}>{l}</option>
			{/each}
		</select>

		<button class="get-word" on:click={lengthChanged}>Get Another Word</button>
	</div>
{/if}

<style>
	div.form-container {
		@apply mb-2;
	}
	div.new-word {
		@apply mx-2 flex flex-wrap;
	}
	div.new-word select {
		@apply border border-black rounded h-8 mr-2;
	}
	div.new-word button.get-word {
		@apply h-8 px-2 border rounded bg-blue-200 border-blue-500;
	}
</style>
