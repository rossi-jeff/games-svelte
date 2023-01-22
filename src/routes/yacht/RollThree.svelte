<script lang="ts">
	import type { YachtTurn } from '../../graphql/types/yacht-turn';
	import DieFace from './DieFace.svelte';

	export let turn: YachtTurn = {};
	let side: number = 64;
</script>

{#if turn && turn.RollThree}
	<div class="roll-three">
		<h2>Roll Three</h2>
		<div class="dice-container">
			{#each turn.RollThree as Die}
				<div class="die">
					<div class="die-display">
						<DieFace face={Die} />
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	div.roll-three {
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
</style>
