<script lang="ts">
	import type { GuessWord } from "../../graphql/types/guess-word";
	import GuessDisplay from "./GuessDisplay.svelte";

    export let game: GuessWord = {}
</script>

{#if game && game.Guesses}
    {#each game.Guesses as guess}
        <GuessDisplay {guess} />
    {/each}
{/if}