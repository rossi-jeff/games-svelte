<script lang="ts">
	import type { YachtTurn } from "../../graphql/types/yacht-turn";
    import { createEventDispatcher } from 'svelte'

    export let turn: YachtTurn = {}
    let Keep: number[] = []
    let checked: number[] = []

    const dispatch = createEventDispatcher()

    const roll = () => {
        Keep = []
        if (!turn.RollTwo) return
        for (let idx of checked) {
            Keep.push(turn.RollTwo[idx])
        }
        dispatch('roll', { Keep })
    }
</script>


{#if turn && turn.RollTwo}
    <div class="roll-two">
        <div>Roll Two</div>
        {#each turn.RollTwo as Die,idx}
            <div class="die">
                <div class="die-display">{Die}</div>
                <input type="checkbox" 
                    name="die-1-{idx}" 
                    id="die-1-{idx}" 
                    value={idx} 
                    bind:group={checked} 
                />
            </div>
        {/each}
        <div>Check the boxes below the dice you wish to keep</div>
        <button on:click={roll}>Third Roll</button>
    </div>
{/if}

<style>
    div.roll-two {
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
    div.die-display {
        font-size: large;
        font-weight: bold;
    }
</style>