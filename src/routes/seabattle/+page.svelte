<script lang="ts">
	import { SEA_BATTLE_TURN } from '../../graphql/mutations/sea-battle-turn';
	import { SEA_BATTLE_CREATE } from '../../graphql/mutations/sea-battle-create';
	import { SEA_BATTLE_SHIP } from '../../graphql/mutations/sea-battle-ship';
	import { SEA_BATTLE } from '../../graphql/queries/sea-battle';
	import { Navy } from '../../graphql/types/navy';
	import type { SeaBattle } from '../../graphql/types/sea-battle';
	import type { SeaBattleShip } from '../../graphql/types/sea-battle-ship';
	import { ShipType } from '../../graphql/types/ship-type';
	import { clone, graphQlClient } from '../../lib';
	import { getShipType } from '../../lib/get-ship-type';
	import OptionsForm from './OptionsForm.svelte';
	import ShipGrid from './ShipGrid.svelte';
	import ShipPlacementGrid from './ShipPlacementGrid.svelte';
	import TargetGrid from './TargetGrid.svelte';
	import type { SeaBattleTurn } from '../../graphql/types/sea-battle-turn';
	import { userSession, type UserSessionData } from '$lib/user-session';
	import { get } from 'svelte/store';
	import { Loader } from '../../lib/loader';
	import type { Target } from '../../graphql/types/target';
	import type { GridPoint } from '../../graphql/types/grid-point';

	let game: SeaBattle = {};
	let ship: SeaBattleShip = {};
	let turn: SeaBattleTurn = {};
	let axis: number = 8;
	let shipsToPlace: string[] = [];
	let turnModes = Object.values(Navy);
	let mode: string = turnModes[1];
	let id: number = 0;
	let turnLog: string[] = [];
	let editShips: boolean = false;
	let playerFired: boolean = false;
	let opponentFired: boolean = false;
	let displayPlayerTurns = (turns: SeaBattleTurn[]) => {};
	let displayOpponentTurns = (turns: SeaBattleTurn[]) => {};
	let displayPlayerShips = (ships: SeaBattleShip[]) => {};
	let resetShips = () => {};
	let playing: boolean = false;

	let session: UserSessionData = get(userSession);

	const getHeaders = () => {
		const { Token } = session;
		let headers: { authorization?: string } = {};
		if (Token) headers.authorization = `Bearer ${Token}`;
		return headers;
	};

	const setAxis = (event: any) => {
		axis = event.detail;
	};

	const createGame = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(SEA_BATTLE_CREATE, { axis }, getHeaders())
			.then((result) => {
				game = result.seaBattleCreate;
				log(`Game started at ${new Date()}`);
				if (game.Id) id = game.Id;
				shipsToPlace = Object.values(ShipType);
				editShips = true;
				playing = true;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const reloadGame = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(SEA_BATTLE, { id })
			.then((result) => {
				console.log('reloadGame');
				game = result.seaBattle;
				if (game.Turns) {
					displayPlayerTurns(game.Turns);
					displayOpponentTurns(game.Turns);
				}
				if (game.Ships) {
					displayPlayerShips(game.Ships);
					console.log(game.Ships);
				}
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const createShip = (event: any) => {
		const { type, points } = event.detail;
		editShips = false;
		Loader.set({ loading: true });
		graphQlClient
			.request(
				SEA_BATTLE_SHIP,
				{
					id,
					ship: { Navy: Navy.Player, Type: getShipType(type), GridPoints: points }
				},
				getHeaders()
			)
			.then((result) => {
				ship = result.seaBattleShip;
				log(`Ship: ${ship.Type} created for  ${ship.Navy} navy at ${new Date()}`);
				createOpponentShip(type);
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const createOpponentShip = (type: string) => {
		Loader.set({ loading: true });
		graphQlClient
			.request(
				SEA_BATTLE_SHIP,
				{ id, ship: { Navy: Navy.Opponent, Type: getShipType(type) } },
				getHeaders()
			)
			.then((result) => {
				let idx = shipsToPlace.indexOf(type);
				if (idx != -1) shipsToPlace.splice(idx, 1);
				resetShips();
				editShips = true;
				ship = result.seaBattleShip;
				log(`Ship: ${ship.Type} created for  ${ship.Navy} navy at ${new Date()}`);
				reloadGame();
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const playerTurn = (event: any) => {
		const { horizontal, vertical } = event.detail;
		Loader.set({ loading: true });
		graphQlClient
			.request(
				SEA_BATTLE_TURN,
				{
					id,
					turn: {
						Navy: Navy.Player,
						GridPoint: {
							Horizontal: horizontal,
							Vertical: vertical
						}
					}
				},
				getHeaders()
			)
			.then((result) => {
				turn = result.seaBattleTurn;
				logTurn(turn.Navy, turn.Target, turn.GridPoint, turn.ShipType);
				playerFired = true;
				reloadGame();
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const opponentTurn = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(SEA_BATTLE_TURN, { id, turn: { Navy: Navy.Opponent } }, getHeaders())
			.then((result) => {
				turn = result.seaBattleTurn;
				logTurn(turn.Navy, turn.Target, turn.GridPoint, turn.ShipType);
				opponentFired = true;
				reloadGame();
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const logTurn = (navy?: Navy, target?: Target, gridPoint?: GridPoint, shipType?: ShipType) => {
		let message: string = '';
		if (navy) message += `${navy}`;
		if (target) message += ` Turn: ${target}`;
		if (shipType) message += ` ${shipType}`;
		if (gridPoint && gridPoint.Horizontal && gridPoint.Vertical) {
			message += ` Point: ${gridPoint.Horizontal}:${gridPoint.Vertical}`;
		}
		message += ` at ${new Date()}`;
		log(message);
	};

	const toggleMode = () => {
		mode = mode === turnModes[1] ? turnModes[0] : turnModes[1];
		playerFired = false;
		opponentFired = false;
		reloadGame();
	};

	const newGame = () => {
		playing = false;
		turnLog = [];
	};

	const log = (message: string) => {
		// silly kludge to get it to render
		let temp = clone(turnLog);
		temp.unshift(message);
		turnLog = temp;
	};
</script>

{#if playing}
	{#if shipsToPlace.length > 0}
		<ShipPlacementGrid
			{axis}
			{shipsToPlace}
			{editShips}
			on:saveShip={createShip}
			bind:resetShipSelect={resetShips}
		/>
	{:else}
		{#if mode === 'Player' || game.Status === 'Won'}
			<TargetGrid
				on:sendPoint={playerTurn}
				on:nextTurn={toggleMode}
				bind:displayTurns={displayPlayerTurns}
				status={game.Status}
				{axis}
				{playerFired}
			/>
		{:else}
			<ShipGrid
				bind:displayShips={displayPlayerShips}
				bind:displayTurns={displayOpponentTurns}
				on:opponentFire={opponentTurn}
				on:nextTurn={toggleMode}
				status={game.Status}
				{axis}
				{opponentFired}
			/>
		{/if}
		{#if game.Status != 'Playing'}
			<button class="new-game" on:click={newGame}>New Game</button>
		{/if}
	{/if}
{:else}
	<OptionsForm on:setAxis={setAxis} on:startGame={createGame} />
{/if}

<div class="turn-log">
	{#each turnLog as message}
		<div>{message}</div>
	{/each}
</div>

<div class="score-link">
	<a href="/seabattle/scores">See Top Scores</a>
</div>

<style>
	div.turn-log {
		@apply overflow-y-auto max-h-20 mx-2 p-2;
	}
	div.turn-log div {
		@apply border border-b-gray-600 border-dashed;
	}
	button.new-game {
		@apply border border-black rounded p-2 m-2;
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
