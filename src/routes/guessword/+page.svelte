<script lang="ts">
	import { graphQlClient } from '../../lib';
	import { WORD_RANDOM } from '../../graphql/queries/word-random';
	import type { Word } from '../../graphql/types/word';
	import type { GuessWord } from '../../graphql/types/guess-word';
	import { GUESS_WORD_CREATE } from '../../graphql/mutations/guess-word-create';
	import GuessForm from './GuessForm.svelte';
	import GuessList from './GuessList.svelte';
	import { GUESS_WORD_GUESS } from '../../graphql/mutations/guess-word-guess';
	import { GameStatus } from '../../graphql/types/game-status';
	import { Rating } from '../../graphql/types/rating';
	import { WORD_HINTS } from '../../graphql/queries/word-hints';
	import HintList from './HintList.svelte';

	let word: Word = {};
	let game: GuessWord = {};
	let wordLoaded: boolean = false;
	let gameLoaded: boolean = false;
	let hints: string[] = []
	type stringOrNUll = string | null
	let hintFilter: { Length: number, Gray: string[], Green: stringOrNUll[] } = {
		Length: 5,
		Gray: [],
		Green: []
	}
	let showHints: boolean = false

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
				buildHintFilters()
				getHints()
			})
			.catch((e) => console.error(e));
	};

	const getHints = () => {
		if (!showHints) return
		graphQlClient.request(WORD_HINTS,{ filter: hintFilter })
			.then(result => {
				const { Hints } = result.wordHints
				hints = Hints
				console.log(hints);	
			})
			.catch((e) => console.error(e));
	}

	const buildHintFilters = () => {
		hintFilter.Length = filter.Length
		hintFilter.Green = []
		for (let i = 0; i < filter.Length; i++) hintFilter.Green[i] = null
		hintFilter.Gray = []
		if (game.Guesses && game.Guesses.length) {
			for (let guess of game.Guesses) {
				const { Guess, Ratings } = guess
				if (!Guess || !Ratings) continue
				let letter: string
				let rating: Rating | undefined
				for (let i = 0; i < Guess.length; i++) {
					letter = Guess[i]
					rating = Ratings[i].Rating
					switch (rating) {
						case Rating.Green:
							hintFilter.Green[i] = letter
							break
						case Rating.Gray:
							hintFilter.Gray.push(letter)
							break
					}
				}
			}
		}
	}

	const lengthChanged = () => {
		wordLoaded = false;
		
		getWord();
	};
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

		<button class="get-word" on:click={lengthChanged}>Get Word</button>
	</div>
{/if}

<div class="hint-check">
	<input type="checkbox" name="show-hints" id="show-hints" bind:checked={showHints} />
	<label for="show-hints">Show Hints</label>
</div>

{#if showHints && hints && hints.length && hints.length < 250}
	<HintList {hints} />
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
	div.hint-check {
		@apply ml-2;
	}
</style>
