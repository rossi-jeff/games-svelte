<script lang="ts">
	import type { YachtScoreOption } from "../../graphql/types/yacht-score-option";
    import { createEventDispatcher } from 'svelte'

    export let options: YachtScoreOption[] = []
    let selected: number = 0

    const dispatch = createEventDispatcher()

    const score = () => {
        const { Category } = options[selected]
        dispatch('score', { Category })
    }
</script>

{#if options && options.length}
    <div class="options-list">
        <div>Option List</div>
        {#each options as option,idx}
            <div class="option">
                <span class="radio">
                    <input type="radio" 
                        name="option-{idx}" 
                        id="option-{idx}" 
                        value={idx}
                        bind:group={selected}
                    />
                </span>
                <span class="category">{option.Category}</span>
                <span class="score">{option.Score}</span>
            </div>
        {/each}
        <button on:click={score}>Score Turn</button>
    </div>
{/if}

<style>
    div.options-list {
        margin-bottom: 1em;
    }
    div.option {
        border-bottom: dotted gray 1px;
    }
    span.radio {
        width: 2em;
        display: inline-block;
    }
    span.category {
        width: 20em;
        display: inline-block;
    }
    span.score {
        width: 5em;
        text-align: right;
        display: inline-block;
    }
</style>