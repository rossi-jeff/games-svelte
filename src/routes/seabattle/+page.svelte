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
		const { Token } =  session
		let headers: { authorization?: string } = {}
		if (Token) headers.authorization = `Bearer ${Token}`
		return headers
	}

	const setAxis = (event: any) => {
		axis = event.detail;
	};

	const createGame = () => {
		graphQlClient
			.request(SEA_BATTLE_CREATE, { axis }, getHeaders())
			.then((result) => {
				game = result.seaBattleCreate;
				log(`Game started at ${new Date()}`);
				if (game.Id) id = game.Id;
				shipsToPlace = Object.values(ShipType);
				editShips = true;
				playing = true;
			})
			.catch((e) => console.error(e));
	};

	const reloadGame = () => {
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
			})
			.catch((e) => console.error(e));
	};

	const createShip = (event: any) => {
		const { type, points } = event.detail;
		editShips = false;
		graphQlClient
			.request(SEA_BATTLE_SHIP, {
				id,
				ship: { Navy: Navy.Player, Type: getShipType(type), GridPoints: points }
			},
			getHeaders())
			.then((result) => {
				ship = result.seaBattleShip;
				log(`Ship: ${ship.Type} created for  ${ship.Navy} navy at ${new Date()}`);
				createOpponentShip(type);
			})
			.catch((e) => console.error(e));
	};

	const createOpponentShip = (type: string) => {
		graphQlClient
			.request(SEA_BATTLE_SHIP, { id, ship: { Navy: Navy.Opponent, Type: getShipType(type) } }, getHeaders())
			.then((result) => {
				let idx = shipsToPlace.indexOf(type);
				if (idx != -1) shipsToPlace.splice(idx, 1);
				resetShips();
				editShips = true;
				ship = result.seaBattleShip;
				log(`Ship: ${ship.Type} created for  ${ship.Navy} navy at ${new Date()}`);
				reloadGame();
			})
			.catch((e) => console.error(e));
	};

	const playerTurn = (event: any) => {
		const { horizontal, vertical } = event.detail;
		graphQlClient
			.request(SEA_BATTLE_TURN, {
				id,
				turn: {
					Navy: Navy.Player,
					GridPoint: {
						Horizontal: horizontal,
						Vertical: vertical
					}
				}
			},
			getHeaders())
			.then((result) => {
				turn = result.seaBattleTurn;
				if (turn.ShipType) {
					log(
						`${turn.Navy} Turn: ${turn.Target} ${turn.ShipType} (${turn.GridPoint?.Horizontal}:${
							turn.GridPoint?.Vertical
						}) at ${new Date()}`
					);
				} else {
					log(
						`${turn.Navy} Turn: ${turn.Target} (${turn.GridPoint?.Horizontal}:${
							turn.GridPoint?.Vertical
						}) at ${new Date()}`
					);
				}
				playerFired = true;
				reloadGame();
			})
			.catch((e) => console.error(e));
	};

	const opponentTurn = () => {
		graphQlClient
			.request(SEA_BATTLE_TURN, { id, turn: { Navy: Navy.Opponent } }, getHeaders())
			.then((result) => {
				turn = result.seaBattleTurn;
				if (turn.ShipType) {
					log(
						`${turn.Navy} Turn: ${turn.Target} ${turn.ShipType} (${turn.GridPoint?.Horizontal}:${
							turn.GridPoint?.Vertical
						}) at ${new Date()}`
					);
				} else {
					log(
						`${turn.Navy} Turn: ${turn.Target} (${turn.GridPoint?.Horizontal}:${
							turn.GridPoint?.Vertical
						}) at ${new Date()}`
					);
				}
				opponentFired = true;
				reloadGame();
			})
			.catch((e) => console.error(e));
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
				{axis}
				{playerFired}
			/>
		{:else}
			<ShipGrid
				bind:displayShips={displayPlayerShips}
				bind:displayTurns={displayOpponentTurns}
				on:opponentFire={opponentTurn}
				on:nextTurn={toggleMode}
				{axis}
				{opponentFired}
			/>
		{/if}
		{#if game.Status != 'Playing'}
			<button on:click={newGame}>New Game</button>
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

<style>
	div.turn-log {
		@apply overflow-y-auto max-h-20 mx-2 p-2;
	}
	div.turn-log div {
		@apply border border-b-gray-600 border-dashed;
	}
</style>
