<script lang="ts">
	import { graphQlClient } from '$lib';
	import type { Word } from '../../graphql/types/word';
	import { onMount } from 'svelte';
	import { WORD_RANDOM } from '../../graphql/queries/word-random';
	import type { HangMan } from '../../graphql/types/hang-man';
	import { HANG_MAN_CREATE } from '../../graphql/mutations/hang-man-create';
	import { HANG_MAN_GUESS } from '../../graphql/mutations/hang-man-guess';

	let word: Word = {}
	let game: HangMan = {}
	const alphabet: string = 'abcdefghijklmnopqrstuvwxyz'
	const letters: string[] = alphabet.split('')
	let display: string[] = []
	const filter = {
		Min: 6,
		Max: 12
	};

	const getWord = () => {
		display = []
		graphQlClient
			.request(WORD_RANDOM, { filter })
			.then((result) => {
				word = result.wordRandom;
				if (word.Length) {
					display = clearDisplay(word.Length)
				}
				createGame()
			})
			.catch((e) => console.error(e));
	};

	const createGame = () => {
		graphQlClient
			.request(HANG_MAN_CREATE,{ wordId: word.Id })
			.then(result => {
				game = result.hangManCreate
			})
			.catch((e) => console.error(e));
	}

	const checkDisabled = (letter: string) => {
		if (game && !game.Id) return false
		if (game.Correct?.includes(letter) || game.Wrong?.includes(letter)) return true
		return false
	}

	const guessLetter = (letter: string) => {
		graphQlClient
			.request(HANG_MAN_GUESS,{ id: game.Id, guess: letter })
			.then(result => {
				console.log(result);
				const { Found, Guess } = result.hangManGuess
				if (Found) setLetterInDisplay(Guess)
				game = result.hangManGuess?.hangMan
				console.log(game);
			})
			.catch((e) => console.error(e));
	}

	const clearDisplay = (length: number) => {
		let d: string[] = []
		for (let i = 0; i < length; i++) d[i] = '_'
		return d
	}

	const setLetterInDisplay = (letter: string) => {
		if (!word.Word?.length) return
		for (let i = 0; i < word.Word?.length; i++) {
			if (word.Word[i] === letter) display[i] = letter
		}
	}

	onMount(() => getWord());
</script>

{#if display.length > 0}
	<div>
		<span class="word-display">
			{#each display as letter}
				<span class="display-letter">{letter.toUpperCase()}</span>
			{/each}
		</span>
	</div>
{/if}

{#if game && game.Wrong?.length}
	<div>
		<span style="margin-right: 2em;">Errors:</span>
		<span class="wrong-display">
			{#each game.Wrong as letter}
				<span class="display-letter">{letter.toUpperCase()}</span>
			{/each}
		</span>
	</div>
{/if}

{#if game && game.Status === 'Playing'}
	<div class="letter-buttons">
		{#each letters as letter}
			<button 
				disabled={checkDisabled(letter)} 
				id="button-{letter}" 
				on:click={() => guessLetter(letter)}
			>
				{letter.toUpperCase()}
			</button>
		{/each}
	</div>
{/if}

<button on:click={getWord}>Get Another Word</button>

<style>
	div.letter-buttons {
		margin-bottom: 1em;
	}
	div.letter-buttons button {
		margin: 0 1em 1em 0;
	}
	span.word-display {
		display: inline-block;
		border: solid black 1px;
		margin-bottom: 1em;
		height: 2.5em;
	}
	span.display-letter {
		display: inline-block;
		border: solid black 1px;
		width: 1.5em;
		height: 1.5em;
		text-align: center;
		margin: 0.5em;
	}
</style>
