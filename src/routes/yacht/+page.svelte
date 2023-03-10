<script lang="ts">
	import type { YachtTurn } from '../../graphql/types/yacht-turn';
	import type { Yacht } from '../../graphql/types/yacht';
	import { graphQlClient } from '$lib';
	import { YACHT_CREATE } from '../../graphql/mutations/yacht-create';
	import type { YachtScoreOption } from '../../graphql/types/yacht-score-option';
	import { YACHT_ROLL } from '../../graphql/mutations/yacht-roll';
	import RollOne from './RollOne.svelte';
	import RollTwo from './RollTwo.svelte';
	import RollThree from './RollThree.svelte';
	import OptionList from './OptionList.svelte';
	import { YACHT_SCORE_TURN } from '../../graphql/mutations/yacht-score-turn';
	import { YACHT } from '../../graphql/queries/yacht';
	import ScoreCard from './ScoreCard.svelte';
	import { userSession, type UserSessionData } from '$lib/user-session';
	import { get } from 'svelte/store';
	import { Loader } from '../../lib/loader';

	let game: Yacht = {};
	let turn: YachtTurn = {};
	let options: YachtScoreOption[] = [];

	let session: UserSessionData = get(userSession);

	const getHeaders = () => {
		const { Token } = session;
		let headers: { authorization?: string } = {};
		if (Token) headers.authorization = `Bearer ${Token}`;
		return headers;
	};

	const createGame = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(YACHT_CREATE, {}, getHeaders())
			.then((result) => {
				game = result.yachtCreate;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const rollDice = (Keep: number[] = []) => {
		Loader.set({ loading: true });
		graphQlClient
			.request(YACHT_ROLL, { id: game.Id, roll: { Keep } }, getHeaders())
			.then((result) => {
				const { Turn, Options } = result.yachtRoll;
				turn = Turn;
				options = Options;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const firstRoll = () => {
		if (turn && turn.RollOne) return;
		rollDice();
	};

	const secondRoll = (event: any) => {
		if (turn && turn.RollTwo) return;
		const { Keep } = event.detail;
		rollDice(Keep);
	};

	const thirdRoll = (event: any) => {
		if (turn && turn.RollThree) return;
		const { Keep } = event.detail;
		rollDice(Keep);
	};

	const scoreTurn = (event: any) => {
		const { Category } = event.detail;
		let Dice: number[] = [];
		if (turn.RollThree) {
			Dice = turn.RollThree;
		} else if (turn.RollTwo) {
			Dice = turn.RollTwo;
		} else if (turn.RollOne) {
			Dice = turn.RollOne;
		}
		Loader.set({ loading: true });
		graphQlClient
			.request(
				YACHT_SCORE_TURN,
				{
					id: turn.Id,
					score: { Category, Dice }
				},
				getHeaders()
			)
			.then(() => {
				turn = {};
				options = [];
				reloadGame();
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const reloadGame = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(YACHT, { id: game.Id })
			.then((result) => {
				game = result.yacht;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};
</script>

<svelte:head>
	<title>Yacht</title>
</svelte:head>

{#if game && game.Id && turn && !turn.RollOne && (!game.Turns || (game.Turns && game.Turns.length < 12))}
	<div class="first-roll">
		<button on:click={firstRoll}>First Roll</button>
	</div>
{/if}

{#if turn && turn.RollOne}
	<RollOne {turn} on:roll={secondRoll} />
{/if}

{#if turn && turn.RollTwo}
	<RollTwo {turn} on:roll={thirdRoll} />
{/if}

{#if turn && turn.RollThree}
	<RollThree {turn} />
{/if}

{#if options && options.length > 0}
	<OptionList {options} on:score={scoreTurn} />
{/if}

{#if game && game.Turns && game.Turns.length > 0}
	<ScoreCard {game} />
{/if}

{#if !game.Id || (game.Turns && game.Turns.length >= 12)}
	<div class="new-game">
		<button on:click={createGame}>New Game</button>
	</div>
{/if}

<div class="score-link">
	<a href="/yacht/scores">See Top Scores</a>
</div>

<style>
	div.first-roll {
		@apply m-2;
	}
	div.new-game {
		@apply m-2;
	}
	div.first-roll button,
	div.new-game button {
		@apply py-1 px-2 border rounded border-black;
	}
	div.first-roll button:hover,
	div.new-game button:hover {
		@apply bg-blue-200;
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
