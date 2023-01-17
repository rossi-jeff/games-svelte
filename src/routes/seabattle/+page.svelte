<script lang="ts">
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
	import ShipPlacementGrid from './ShipPlacementGrid.svelte';

	let game: SeaBattle = {};
	let ship: SeaBattleShip = {};
	let axis: number = 8;
	let shipsToPlace: string[] = [];
	let turnModes = Object.values(Navy);
	let turn: string = turnModes[0];
	let id: number = 0;
	let turnLog: string[] = [];
	let editShips: boolean = false;

	const setAxis = (event: any) => {
		axis = event.detail;
	};

	const createGame = () => {
		graphQlClient
			.request(SEA_BATTLE_CREATE, { axis })
			.then((result) => {
				game = result.seaBattleCreate;
				log(`Game started at ${new Date()}`);
				if (game.Id) id = game.Id;
				shipsToPlace = Object.values(ShipType);
				editShips = true;
			})
			.catch((e) => console.error(e));
	};

	const reloadGame = () => {
		graphQlClient
			.request(SEA_BATTLE, { id })
			.then((result) => {
				game = result.seaBattle;
				console.log(game);
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
			})
			.then((result) => {
				ship = result.seaBattleShip;
				log(`Ship: ${ship.Type} created for  ${ship.Navy} navy at ${new Date()}`);
				console.log(ship);
				createOpponentShip(type);
			})
			.catch((e) => console.error(e));
	};

	const createOpponentShip = (type: string) => {
		graphQlClient
			.request(SEA_BATTLE_SHIP, { id, ship: { Navy: Navy.Opponent, Type: getShipType(type) } })
			.then((result) => {
				let idx = shipsToPlace.indexOf(type);
				if (idx != -1) shipsToPlace.splice(idx, 1);
				editShips = true;
				ship = result.seaBattleShip;
				log(`Ship: ${ship.Type} created for  ${ship.Navy} navy at ${new Date()}`);
				console.log(ship);
				reloadGame();
			})
			.catch((e) => console.error(e));
	};

	const log = (message: string) => {
		// silly kludge to get it to rebder
		let temp = clone(turnLog);
		temp.unshift(message);
		turnLog = temp;
	};
</script>

<div>Sea Battle</div>

{#if shipsToPlace.length > 0}
	<ShipPlacementGrid {axis} {shipsToPlace} {editShips} on:saveShip={createShip} />
{/if}

{#if turn === 'Player'}
	<div>target grid</div>
{:else}
	<div>ship grid</div>
{/if}

{#if game && game.Id}
	<div />
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
		min-height: 0;
		max-height: 6em;
		overflow-y: auto;
	}
	div.turn-log div {
		border-bottom: dotted gray 1px;
	}
</style>
