<script lang="ts">
	import type { GuessWord } from '../../../graphql/types/guess-word';
	import GuessWordItem from './GuessWordItem.svelte';

	export let items: GuessWord[] = [];
</script>

<div class="guess-word-items">
	<div class="guess-words-header">
		<div class="user">User</div>
		<div class="score">Score</div>
		<div class="word">Word</div>
		<div class="length">Length</div>
	</div>
	{#each items as item}
		<GuessWordItem {item} />
	{/each}
</div>

<style>
	div.guess-words-header {
		@apply flex flex-wrap justify-between px-2 bg-blue-400 py-1 font-bold;
	}
	div.user {
		@apply w-48;
	}
	div.score {
		@apply w-24 text-center;
	}
	div.word {
		@apply w-24 text-center;
	}
	div.length {
		@apply w-24 text-right;
	}
</style>
