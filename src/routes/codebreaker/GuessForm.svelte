<script lang="ts">
	import { getColor } from '../../lib/get-color';
    import { createEventDispatcher } from 'svelte'

    export let availableColors: string[]
    export let availableColumns: number

    let selected: string[] = []
    let complete: boolean = false

    const dispatch = createEventDispatcher()

    const checkComplete = () => {
        let valid: boolean = true
        for (let color of selected) {
            if (!color || color.length === 0) valid = false
        }
        complete = valid
    }

    const clearSelected = () => {
        for (let i = 0; i < selected.length; i++) selected[i] = ''
        complete = false
    }

    const createGuess = () => {
        let data = {
            colors: selected.map(s => getColor(s))
        }
        dispatch('sendGuess',data)
        clearSelected()
    }
</script>

<div class="guess-form">
    {#each Array(availableColumns) as _,i (i)}
        <span class="color">
            <select bind:value={selected[i]} on:change={checkComplete}>
                <option value=""> - select - </option>
                {#each availableColors as color}
                <option value={color}>{color}</option>
                {/each}
            </select>
        </span>
    {/each}
    {#if complete}
        <button on:click={createGuess}>Send Guess</button>
    {/if}
</div>

<style>
    span.color {
        margin-right: 1em;
    }
</style>