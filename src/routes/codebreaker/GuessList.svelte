<script lang="ts">
	import type { CodeBreakerGuess } from "../../graphql/types/code-breaker-guess";
	import GuessDisplay from "./GuessDisplay.svelte";

    export let guesses: CodeBreakerGuess[] = []
</script>

{#each guesses as guess}
    <GuessDisplay {guess} />
{/each}