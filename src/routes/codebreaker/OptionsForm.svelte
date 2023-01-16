<script lang="ts">
	import { Color } from "../../graphql/types/color";
    import { createEventDispatcher } from 'svelte'
	import { getColor } from '../../lib';

    let colors: string[] = Object.values(Color)
    let columns: number[] = [4,5,6,7,8]
    let selected: string[] = []
    let column: number = 4

    const dispatch = createEventDispatcher()

    const createGame = () => {
        if (selected.length < 2) return
        let data = {
            colors: selected.map(c => getColor(c)), 
            columns: column,
            selected
        }
        dispatch('sendOptions', data)
    }
</script>

<div class="color-picker">
    {#each colors as color}
        <span class="color">
            <input 
                type="checkbox" 
                id="color-{color}" 
                value={color} 
                bind:group={selected} 
            />
            <label for="color-{color}">
                {color}
            </label>
        </span>
    {/each}
</div>

<select bind:value={column}>
    {#each columns as col}
    <option value={col}>{col}</option>
    {/each}
</select>

{#if selected.length > 1}
    <button on:click={createGame}>Start Game</button>
{/if}

<style>
    span.color {
        margin-right: 1em;
    }
</style>