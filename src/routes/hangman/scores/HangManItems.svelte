<script lang="ts">
	import type { HangMan } from '../../../graphql/types/hang-man';
	import HangManItem from './HangManItem.svelte';
	import { EyeSolid } from 'svelte-awesome-icons';

	export let items: HangMan[] = [];
</script>

<div class="hang-man-items">
	<div class="hang-man-header">
		<div><EyeSolid /></div>
		<div class="user">User</div>
		<div class="score">Score</div>
		<div class="correct">Correct</div>
		<div class="wrong">Wrong</div>
		<div class="word">Word</div>
		<div class="length">Length</div>
	</div>
	{#each items as item}
		<HangManItem {item} />
	{/each}
</div>

<style>
	div.hang-man-header {
		@apply flex flex-wrap justify-between px-2 bg-blue-400 py-1 font-bold;
	}
	div.user {
		@apply w-48;
	}
	div.score {
		@apply w-24 text-center;
	}
	div.correct {
		@apply w-24 text-center;
	}
	div.wrong {
		@apply w-24 text-center;
	}
	div.word {
		@apply w-32 text-center;
	}
	div.length {
		@apply w-24 text-right;
	}
</style>
