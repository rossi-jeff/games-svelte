<script lang="ts">
	import type { CodeBreakerGuess } from '../../graphql/types/code-breaker-guess';

	export let guess: CodeBreakerGuess;
</script>

{#if guess}
	<div class="guess">
		{#if guess.Guess}
			<span class="colors">
				{#each guess.Guess as column}
					<span class="color {column.Color}" />
				{/each}
			</span>
		{/if}
		{#if guess.Keys}
			<span class="keys">
				{#each guess.Keys as column}
					<span class="key {column.Key}" />
				{/each}
			</span>
		{/if}
	</div>
{/if}

<style>
	.guess {
		@apply flex flex-wrap px-2 h-10 py-1;
	}
	.colors {
		@apply mr-6  flex flex-wrap;
	}
	.color {
		@apply h-8 w-8 border rounded-full mr-3;
	}
	.keys {
		@apply flex flex-wrap;
	}
	.key {
		@apply h-4 w-4 border rounded-full mr-1 mb-2;
	}
	.Black {
		@apply bg-black border-black;
	}
	.Blue {
		@apply bg-blue-700 border-blue-900;
	}
	.Brown {
		@apply bg-amber-800 border-amber-900;
	}
	.Green {
		@apply bg-green-500 border-green-900;
	}
	.Orange {
		@apply bg-orange-400 border-orange-900;
	}
	.Purple {
		@apply bg-purple-600 border-purple-900;
	}
	.Red {
		@apply bg-red-600 border-red-900;
	}
	.White {
		@apply bg-white border-black;
	}
	.Yellow {
		@apply bg-yellow-300 border-yellow-900;
	}
</style>
