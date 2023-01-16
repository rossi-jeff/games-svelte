<script lang="ts">
	import type { CodeBreakerGuess } from "../../graphql/types/code-breaker-guess";

    export let guess: CodeBreakerGuess 
</script>

{#if guess}
<div class="guess">
    {#if guess.Guess}
    <span class="colors">
        {#each guess.Guess as column}
            <span class="color {column.Color}"></span>
        {/each}
    </span>
    {/if}
    {#if guess.Keys}
    <span class="keys">
        {#each guess.Keys as column}
            <span class="key {column.Key}"></span>
        {/each}
    </span>
    {/if}
</div>
{/if}

<style>
    .colors {
        margin-right: 2em;
    }
    .color {
        display: inline-block;
        width: 3em;
        height: 2em;
        border: solid black 1px;
        margin-right: 1em;
    }
    .key {
        display: inline-block;
        width: 1em;
        height: 2em;
        border: solid black 1px;
        margin-right: 1em;
    }
    .Black {
        background-color: black;
    }
    .Blue {
        background-color: blue;
    }
    .Brown {
        background-color: brown;
    }
    .Green {
        background-color: green;
    }
    .Orange {
        background-color: orange;
    }
    .Purple {
        background-color: purple;
    }
    .Red {
        background-color: red;
    }
    .White {
        background-color: white;
    }
    .Yellow {
        background-color: yellow;
    }
</style>