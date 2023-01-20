<script lang="ts">
	import type { GuessWord } from '../../graphql/types/guess-word';
	import GuessDisplay from './GuessDisplay.svelte';

	export let game: GuessWord = {};
</script>

{#if game && game.Guesses && game.Guesses.length > 0}
	{#each game.Guesses as guess}
		<GuessDisplay {guess} />
	{/each}
	<div class="color-key">
		<div class="Green">Correct Place and Letter</div>
		<div class="Brown">Correct Letter</div>
		<div class="Gray">Incorrect Letter</div>
	</div>
{/if}

<style>
	div.color-key {
		@apply p-2 mb-2 flex flex-wrap;
	}
	div.color-key div {
		@apply h-8 px-2 py-1 text-sm;
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
