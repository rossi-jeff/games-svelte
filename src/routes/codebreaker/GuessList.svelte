<script lang="ts">
	import type { CodeBreakerGuess } from '../../graphql/types/code-breaker-guess';
	import GuessDisplay from './GuessDisplay.svelte';

	export let guesses: CodeBreakerGuess[] = [];
</script>

<div class="guess-list">
	{#each guesses as guess}
		<GuessDisplay {guess} />
	{/each}
</div>

<style>
	div.guess-list {
		@apply border border-black p-2 mx-2 mb-2;
	}
</style>
