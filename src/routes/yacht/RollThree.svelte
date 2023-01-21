<script lang="ts">
	import type { YachtTurn } from "../../graphql/types/yacht-turn";
	import DieFace from "./DieFace.svelte";

    export let turn: YachtTurn = {}
</script>

{#if turn && turn.RollThree}
    <div class="roll-three">
        <div>Roll Three</div>
        {#each turn.RollThree as Die}
            <div class="die">
                <div class="die-display">
                    <DieFace face={Die} />
                </div>
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
    :global(div.die-display img) {
        width: 4em;
        height: 4em;
    }
</style>