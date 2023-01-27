<script lang="ts">
	import type { CodeBreaker } from '../../graphql/types/code-breaker';
	import { graphQlClient } from '../../lib';
	import { CODE_BREAKER_CREATE } from '../../graphql/mutations/code-breaker-create';
	import OptionsForm from './OptionsForm.svelte';
	import GuessForm from './GuessForm.svelte';
	import { CODE_BREAKER_GUESS } from '../../graphql/mutations/code-breaker-guess';
	import type { CodeBreakerGuess } from '../../graphql/types/code-breaker-guess';
	import { CODE_BREAKER } from '../../graphql/queries/code-breaker';
	import GuessList from './GuessList.svelte';
	import { userSession, type UserSessionData } from '$lib/user-session';
	import { get } from 'svelte/store';
	import { Loader } from '../../lib/loader';

	let game: CodeBreaker = {};
	let guess: CodeBreakerGuess = {};
	let availableColors: string[] = [];
	let availableColumns: number;

	let session: UserSessionData = get(userSession);

	const getHeaders = () => {
		const { Token } = session;
		let headers: { authorization?: string } = {};
		if (Token) headers.authorization = `Bearer ${Token}`;
		return headers;
	};

	const createGame = (event: any) => {
		Loader.set({ loading: true });
		const { colors, columns, selected } = event.detail;

		availableColors = selected;
		availableColumns = columns;

		graphQlClient
			.request(CODE_BREAKER_CREATE, { colors, columns }, getHeaders())
			.then((result) => {
				game = result.codeBreakerCreate;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const createGuess = (event: any) => {
		Loader.set({ loading: true });
		const { colors } = event.detail;
		const id = game.Id;
		graphQlClient
			.request(CODE_BREAKER_GUESS, { id, colors }, getHeaders())
			.then((result) => {
				guess = result.codeBreakerGuess;
				if (!game.Guesses) game.Guesses = [];
				game.Guesses.push(guess);
				Loader.set({ loading: false });
				reloadGame();
			})
			.catch((e) => console.error(e));
	};

	const reloadGame = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(CODE_BREAKER, { id: game.Id })
			.then((result) => {
				game = result.codeBreaker;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};
</script>

{#if game && game.Guesses}
	<GuessList guesses={game.Guesses} />
{/if}

{#if game && game.Status === 'Playing'}
	<GuessForm {availableColors} {availableColumns} on:sendGuess={createGuess} />
{:else}
	<OptionsForm on:sendOptions={createGame} />
	{#if game.Status}
		<div class="ml-2">Status: {game.Status}</div>
	{/if}
{/if}

<div class="score-link">
	<a href="/codebreaker/scores">See Top Scores</a>
</div>

<style>
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
