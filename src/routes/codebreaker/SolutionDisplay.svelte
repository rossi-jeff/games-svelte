<script lang="ts">
	import type { CodeBreakerCode } from '../../graphql/types/code-breaker-code';

	export let solution: CodeBreakerCode[] = [];
</script>

<div class="solution">
	{#each solution as item}
		<div class={item.Color} />
	{/each}
</div>

<style>
	div.solution {
		@apply flex flex-wrap mx-2 mb-2;
	}
	div.solution div {
		@apply w-8 h-8 rounded-full mr-3 border;
	}
	:global(.Black) {
		@apply bg-black border-black;
	}
	:global(.Blue) {
		@apply bg-blue-700 border-blue-900;
	}
	:global(.Brown) {
		@apply bg-amber-800 border-amber-900 text-white;
	}
	:global(.Green) {
		@apply bg-green-500 border-green-900;
	}
	:global(.Orange) {
		@apply bg-orange-400 border-orange-900;
	}
	:global(.Purple) {
		@apply bg-purple-600 border-purple-900;
	}
	:global(.Red) {
		@apply bg-red-600 border-red-900;
	}
	:global(.White) {
		@apply bg-white border-black;
	}
	:global(.Yellow) {
		@apply bg-yellow-300 border-yellow-900;
	}
</style>
