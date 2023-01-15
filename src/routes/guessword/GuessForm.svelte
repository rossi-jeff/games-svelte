<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    export let length: number = 0
    export let wordLoaded: boolean = false
    let letters: string[] = []
    let showButton: boolean = false

    const dispatch = createEventDispatcher()

    const buildLetters = (length: number) => {
        let l = []
        for (let i = 0; i < length; i++) l[i] = ''
        return l
    }

    const checkLetters = () => {
        showButton = false
        let valid: boolean = true
        for (let letter of letters) {
            if (letter.length != 1) valid = false
        }
        showButton = valid
    }

    const sendGuess = () => {
        dispatch('sendGuess',{ Guess: letters.join('') })
        letters = buildLetters(length)
        showButton = false
    }

    if (length) {
        letters = buildLetters(length)
    }
</script>

<div class="form-container">
    {#if wordLoaded}
        {#each letters as letter,index}
            <input type="text" 
                name="letter-{index}" 
                id="letter-{index}" 
                bind:value={letter} 
                on:keyup={checkLetters}
                maxlength="1" 
                class="single" 
            />
        {/each}
        {#if showButton}
            <button on:click={sendGuess}>
                Guess
            </button>
        {/if}
    {/if}
</div>

<style>
    input.single {
        width: 1.5em;
        height: 1.5em;
        margin: 0 1em 1em 0;
        text-align: center;
    }
    div.form-container {
        height: 2em;
    }
</style>