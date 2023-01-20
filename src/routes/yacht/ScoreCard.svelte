<script lang="ts">
	import type { Yacht } from "../../graphql/types/yacht";


    export let game: Yacht = {}
</script>

{#if game && game.Turns}
    <div class="score-card">
        {#each game.Turns as turn}
            <div class="turn">
                <span class="category">{turn.Category}</span>
                <span class="score">{turn.Score}</span>
            </div>
        {/each}
        <div>
            <span class="total-label">Total</span>
            <span class="score">{game.Total}</span>
        </div>
    </div>
{/if}

<style>
    div.score-card {
        border: dotted gray 1px;
    }
    span.category, span.total-label {
        width: 22em;
        display: inline-block;
    }
    span.total-label {
        text-align: right;
    }
    span.score {
        width: 5em;
        text-align: right;
        display: inline-block;
    }
</style>