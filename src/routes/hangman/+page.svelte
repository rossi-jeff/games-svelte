<script lang="ts">
	import { alphabet, graphQlClient } from '$lib';
	import type { Word } from '../../graphql/types/word';
	import { WORD_RANDOM } from '../../graphql/queries/word-random';
	import type { HangMan } from '../../graphql/types/hang-man';
	import { HANG_MAN_CREATE } from '../../graphql/mutations/hang-man-create';
	import { HANG_MAN_GUESS } from '../../graphql/mutations/hang-man-guess';
	import { GameStatus } from '../../graphql/types/game-status';
	import { userSession, type UserSessionData } from '$lib/user-session';
	import { get } from 'svelte/store';

	let word: Word = {};
	let game: HangMan = {};
	const letters: string[] = alphabet.split('');
	let display: string[] = [];
	const filter = {
		Min: 6,
		Max: 12
	};
	const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

	let session: UserSessionData = get(userSession);

	const getHeaders = () => {
		const { Token } = session;
		let headers: { authorization?: string } = {};
		if (Token) headers.authorization = `Bearer ${Token}`;
		return headers;
	};

	const getWord = () => {
		display = [];
		graphQlClient
			.request(WORD_RANDOM, { filter })
			.then((result) => {
				word = result.wordRandom;
				if (word.Length) {
					display = clearDisplay(word.Length);
					clearLetterClass();
					clearHangMan();
				}
				createGame();
			})
			.catch((e) => console.error(e));
	};

	const createGame = () => {
		graphQlClient
			.request(HANG_MAN_CREATE, { wordId: word.Id }, getHeaders())
			.then((result) => {
				game = result.hangManCreate;
			})
			.catch((e) => console.error(e));
	};

	const checkDisabled = (letter: string) => {
		if (game && !game.Id) return false;
		if (game.Correct?.includes(letter) || game.Wrong?.includes(letter)) return true;
		return false;
	};

	const guessLetter = (letter: string) => {
		graphQlClient
			.request(HANG_MAN_GUESS, { id: game.Id, guess: letter }, getHeaders())
			.then((result) => {
				console.log(result);
				const { Found, Guess } = result.hangManGuess;
				if (Found) setLetterInDisplay(Guess);
				setLetterClass(Found, letter);
				game = result.hangManGuess?.hangMan;
				if (!Found) drawHangMan();
			})
			.catch((e) => console.error(e));
	};

	const drawHangMan = () => {
		if (!game.Wrong || !game.Wrong.length) return;
		const partId = parts[game.Wrong.length - 1];
		const el = document.getElementById(partId);
		if (el) el.classList.add('visible');
	};

	const clearHangMan = () => {
		let el;
		for (let partId of parts) {
			el = document.getElementById(partId);
			if (el) el.classList.remove('visible');
		}
	};

	const setLetterClass = (found: boolean, letter: string) => {
		let buttonId = `button-${letter}`;
		let el = document.getElementById(buttonId);

		if (el) {
			let list = el.classList;
			if (found) {
				list.toggle('found');
			} else {
				list.toggle('not-found');
			}
		}
	};

	const clearLetterClass = () => {
		let el, name;
		for (let letter of letters) {
			name = `button-${letter}`;
			el = document.getElementById(name);
			if (el) {
				el.classList.remove('found');
				el.classList.remove('not-found');
			}
		}
	};

	const clearDisplay = (length: number) => {
		let d: string[] = [];
		for (let i = 0; i < length; i++) d[i] = '';
		return d;
	};

	const setLetterInDisplay = (letter: string) => {
		if (!word.Word?.length) return;
		for (let i = 0; i < word.Word?.length; i++) {
			if (word.Word[i] === letter) display[i] = letter;
		}
	};
</script>

<div id="hangman-graphic">
	<div id="gallows-top" />
	<div id="gallows-side" />
	<div id="gallows-bottom" />
	<div id="rope" />
	<div id="head" />
	<div id="body" />
	<div id="left-arm" />
	<div id="right-arm" />
	<div id="left-leg" />
	<div id="right-leg" />
</div>

{#if display.length > 0}
	<div>
		<span class="word-display">
			{#each display as letter}
				<span class="display-letter">{letter.toUpperCase()}</span>
			{/each}
		</span>
	</div>
{/if}

{#if game && game.Status === GameStatus.Playing}
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
{:else if game && game.Word && game.Status && game.Status === GameStatus.Lost}
	<div class="notification">The word was <b>{game.Word.Word}</b></div>
{/if}

{#if game && game.Status != GameStatus.Playing}
	<button class="new-word" on:click={getWord}>Get Word</button>
{/if}

<div class="score-link">
	<a href="/hangman/scores">See Top Scores</a>
</div>

<style>
	div#hangman-graphic {
		@apply w-72 h-96 border rounded border-black ml-2 relative p-0;
	}
	div#gallows-top {
		@apply w-40 h-8 bg-black absolute top-4 left-4;
	}
	div#gallows-side {
		@apply w-8 h-72 bg-black absolute top-12 left-6;
	}
	div#gallows-bottom {
		@apply h-8 w-64 bg-black absolute left-2 bottom-4;
	}
	div#rope {
		@apply w-4 h-8 bg-gray-600 absolute top-12 left-36;
	}
	div#head {
		@apply w-12 h-12  bg-gray-300 rounded-full absolute top-20 left-32 invisible;
	}
	div#body {
		@apply w-24 h-24  bg-gray-300 rounded-full absolute top-32 left-[105px] invisible;
	}
	div#left-arm {
		@apply w-14 h-6  bg-gray-300 absolute  top-36 left-[68px] invisible;
	}
	div#right-arm {
		@apply w-14 h-6  bg-gray-300 absolute top-36 left-[185px] invisible;
	}
	div#left-leg {
		@apply w-6 h-28  bg-gray-300 absolute top-52 left-[115px] invisible;
	}
	div#right-leg {
		@apply w-6 h-28  bg-gray-300 absolute top-52 left-[165px] invisible;
	}
	div.letter-buttons {
		@apply flex flex-wrap p-2;
	}
	div.letter-buttons button {
		@apply w-8 h-8 border border-black rounded bg-gray-300 mr-2;
	}
	div.letter-buttons button:hover {
		@apply bg-gray-500;
	}
	div.notification {
		@apply ml-2 my-4;
	}
	span.word-display {
		@apply flex p-2;
	}
	span.display-letter {
		@apply flex-none w-8 h-8 border-b border-black mr-2 text-center;
	}
	button.new-word {
		@apply ml-2 p-2 mt-2 border border-black rounded bg-gray-300;
	}
	button.new-word:hover {
		@apply bg-gray-500;
	}
	:global(div.letter-buttons button.found) {
		background-color: lightgreen !important;
	}
	:global(div.letter-buttons button.not-found) {
		background-color: lightcoral !important;
	}
	:global(.visible) {
		visibility: visible !important;
	}
	div.score-link {
		@apply m-2;
	}
	div.score-link a {
		@apply text-blue-700 font-bold no-underline;
	}
	div.score-link a:hover {
		@apply text-blue-900 underline;
	}
</style>
