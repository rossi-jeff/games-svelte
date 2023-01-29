<script lang="ts">
	import type { Yacht } from '../../../graphql/types/yacht';
	import YachtItem from './YachtItem.svelte';
	import { EyeSolid } from 'svelte-awesome-icons';

	export let items: Yacht[] = [];
</script>

<div class="yacht-items">
	<div class="yacht-header">
		<div><EyeSolid /></div>
		<div class="user">User</div>
		<div class="score">Score</div>
	</div>
	{#each items as item}
		<YachtItem {item} />
	{/each}
</div>

<style>
	div.yacht-header {
		@apply flex flex-wrap justify-between px-2 bg-blue-400 py-1 font-bold;
	}
</style>
