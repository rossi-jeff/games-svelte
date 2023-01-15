<script lang="ts">
	import type { GuessWordGuess } from "../../graphql/types/guess-word-guess";


    export let guess: GuessWordGuess = {}
</script>

{#if guess && guess.Guess && guess.Ratings}
<div class="guess-container">
    {#each guess.Ratings as rating,index}
    <div class={rating.Rating}>{guess.Guess[index]}</div>
    {/each}
</div>
{/if}

<style>
    div.guess-container {
        margin-bottom: 1em;
        color: #000;
    }
    div.Green {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        border: solid black 1px;
        margin-right: 1em;
        text-align: center;
        background-color: lightgreen;
        padding-top: 0.25em;
    }
    div.Gray {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        border: solid black 1px;
        margin-right: 1em;
        text-align: center;
        background-color: lightgrey;
        padding-top: 0.25em;
    }
    div.Brown {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        border: solid black 1px;
        margin-right: 1em;
        text-align: center;
        background-color: tan;
        padding-top: 0.25em;
    }
</style>