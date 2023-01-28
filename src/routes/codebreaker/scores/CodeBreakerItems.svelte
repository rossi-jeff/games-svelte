<script lang="ts">
	import type { CodeBreaker } from '../../../graphql/types/code-breaker';
	import CodeBreakerItem from './CodeBreakerItem.svelte';
	import { EyeSolid } from 'svelte-awesome-icons'

	export let items: CodeBreaker[] = [];
</script>

<div class="code-breaker-items">
	<div class="items-header">
		<div><EyeSolid /></div>
		<div class="user">User</div>
		<div class="score">Score</div>
		<div class="status">Status</div>
		<div class="columns">Columns</div>
		<div class="colors">Colors</div>
	</div>
	{#each items as item}
		<CodeBreakerItem {item} />
	{/each}
</div>

<style>
	div.items-header {
		@apply flex flex-wrap justify-between px-2 bg-blue-400 py-1 font-bold;
	}
	div.items-header div.user {
		@apply w-48;
	}
	div.items-header div.score {
		@apply w-24 text-center;
	}
	div.items-header div.status {
		@apply w-24 text-center;
	}
	div.items-header div.columns {
		@apply w-24 text-center;
	}
	div.items-header div.colors {
		@apply w-24 text-right pr-2;
	}
</style>
