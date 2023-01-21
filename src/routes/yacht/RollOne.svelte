<script lang="ts">
	import type { YachtTurn } from "../../graphql/types/yacht-turn";
    import { createEventDispatcher } from 'svelte'
	import DieFace from "./DieFace.svelte";

    export let turn: YachtTurn = {}
    let Keep: number[] = []
    let checked: number[] = []

    const dispatch = createEventDispatcher()

    const roll = () => {
        Keep = []
        if (!turn.RollOne) return
        for (let idx of checked) {
            Keep.push(turn.RollOne[idx])
        }
        dispatch('roll', { Keep })
    }
</script>

{#if turn && turn.RollOne}
    <div class="roll-one">
        <div>Roll One</div>
        {#each turn.RollOne as Die,idx}
            <div class="die">
                <div class="die-display">
                    <DieFace face={Die} />
                </div>
                <input type="checkbox" 
                    name="die-1-{idx}" 
                    id="die-1-{idx}" 
                    value={idx} 
                    bind:group={checked} 
                />
            </div>
        {/each}
        <div>Check the boxes below the dice you wish to keep</div>
        <button on:click={roll}>Second Roll</button>
    </div>
{/if}


<style>
    div.roll-one {
        border: solid black 1px;
        padding: 1em;
        margin-bottom: 1em;
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