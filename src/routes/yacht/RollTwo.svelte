<script lang="ts">
	import type { YachtTurn } from '../../graphql/types/yacht-turn';
	import { createEventDispatcher } from 'svelte';
	import DieFace from './DieFace.svelte';
	import RollThree from './RollThree.svelte';

	export let turn: YachtTurn = {};
	let Keep: number[] = [];
	let checked: number[] = [];
	let side: number = 64;

	const dispatch = createEventDispatcher();

	const roll = () => {
		Keep = [];
		if (!turn.RollTwo) return;
		for (let idx of checked) {
			Keep.push(turn.RollTwo[idx]);
		}
		dispatch('roll', { Keep });
	};
</script>

{#if turn && turn.RollTwo}
	<div class="roll-two">
		<h2>Roll Two</h2>
		<div class="dice-container">
			{#each turn.RollTwo as Die, idx}
				<div class="die">
					<div class="die-display">
						<DieFace face={Die} {side} />
					</div>
					<input
						type="checkbox"
						name="die-1-{idx}"
						id="die-1-{idx}"
						value={idx}
						bind:group={checked}
					/>
				</div>
			{/each}
		</div>
		<div>Check the boxes below the dice you wish to keep</div>
		{#if turn && !turn.RollThree}
			<button on:click={roll}>Third Roll</button>
		{/if}
	</div>
{/if}

<style>
	div.roll-two {
		@apply border rounded border-black p-2 mx-2 mb-2;
	}
	h2 {
		@apply text-lg font-bold;
	}
	div.dice-container {
		@apply flex flex-wrap justify-between;
	}
	div.die {
		@apply border rounded border-black p-2 mr-2 text-center bg-white;
	}
	div.die-display {
		@apply px-2 m-0;
	}
	button {
		@apply py-1 px-2 border rounded border-black;
	}
	button:hover {
		@apply bg-blue-200;
	}
</style>
