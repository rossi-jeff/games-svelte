<script lang="ts">
	import type { YachtTurn } from "../../graphql/types/yacht-turn";

    export let turn: YachtTurn = {}
</script>

{#if turn && turn.RollThree}
    <div class="roll-three">
        <div>Roll Three</div>
        {#each turn.RollThree as Die}
            <div class="die">
                <div class="die-display">{Die}</div>
            </div>
        {/each}
    </div>
{/if}

<style>
    div.roll-three {
        border: solid black 1px;
        padding: 1em;
        margin-bottom: 0.5em;
    }
    div.die {
        width: 6em;
        text-align: center;
        border: solid black 1px;
        padding: 1em;
        background-color: silver;
        margin-right: 1em;
        display: inline-block;
    }
    div.die-display {
        font-size: large;
        font-weight: bold;
    }
</style>