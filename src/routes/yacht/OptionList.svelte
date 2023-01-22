<script lang="ts">
	import type { YachtScoreOption } from '../../graphql/types/yacht-score-option';
	import { createEventDispatcher } from 'svelte';

	export let options: YachtScoreOption[] = [];
	let selected: number = 0;

	const dispatch = createEventDispatcher();

	const score = () => {
		const { Category } = options[selected];
		dispatch('score', { Category });
	};
</script>

{#if options && options.length}
	<div class="options-list">
		<h2>Scoring Options</h2>
		{#each options as option, idx}
			<div class="option">
				<span>
					<span class="radio">
						<input
							type="radio"
							name="option-{idx}"
							id="option-{idx}"
							value={idx}
							bind:group={selected}
						/>
					</span>
					<span class="category">{option.Category}</span>
				</span>
				<span class="score">{option.Score}</span>
			</div>
		{/each}
		<button on:click={score}>Score Turn</button>
	</div>
{/if}

<style>
	div.options-list {
		@apply border rounded border-black p-2 mx-2 mb-2;
	}
	h2 {
		@apply text-lg font-bold;
	}
	div.option {
		@apply mx-1 border border-b-gray-500 border-dashed flex flex-wrap justify-between;
	}
	span.radio {
		@apply p-0 m-0;
	}
	span.category {
		@apply px-2 font-semibold text-left;
	}
	span.score {
		@apply text-right;
	}
	button {
		@apply py-1 px-2 mt-2 border rounded border-black;
	}
	button:hover {
		@apply bg-blue-200;
	}
</style>
