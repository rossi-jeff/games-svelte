<script lang="ts">
	import type { Yacht } from '../../graphql/types/yacht';

	export let game: Yacht = {};
</script>

{#if game && game.Turns}
	<div class="score-card">
		<h2>Score Card</h2>
		{#each game.Turns as turn}
			<div class="turn">
				<span class="category">{turn.Category}</span>
				<span class="score">{turn.Score}</span>
			</div>
		{/each}
		<div class="total">
			<span class="total-label">Total</span>
			<span class="score">{game.Total}</span>
		</div>
	</div>
{/if}

<style>
	div.score-card {
		@apply border rounded border-black p-2 mx-2 mb-2;
	}
	h2 {
		@apply text-lg font-bold;
	}
	div.turn {
		@apply flex flex-wrap justify-between border border-b-gray-500 border-dashed;
	}
	div.total {
		@apply flex flex-wrap justify-between;
	}
	span.score {
		@apply text-right;
	}
</style>
