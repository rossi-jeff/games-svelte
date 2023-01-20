<script lang="ts">
	import type { GuessWordGuess } from '../../graphql/types/guess-word-guess';

	export let guess: GuessWordGuess = {};
</script>

{#if guess && guess.Guess && guess.Ratings}
	<div class="guess-container">
		{#each guess.Ratings as rating, index}
			<div class={rating.Rating}>{guess.Guess[index].toUpperCase()}</div>
		{/each}
	</div>
{/if}

<style>
	div.guess-container {
		@apply p-2 flex flex-wrap;
	}
	div.guess-container div {
		@apply h-8 w-8;
	}
	div.Green {
		@apply text-center border rounded border-green-500 bg-green-200 mr-2;
	}
	div.Gray {
		@apply text-center border rounded border-gray-500 bg-gray-200 mr-2;
	}
	div.Brown {
		@apply text-center border rounded border-amber-800 bg-amber-400 mr-2;
	}
</style>
