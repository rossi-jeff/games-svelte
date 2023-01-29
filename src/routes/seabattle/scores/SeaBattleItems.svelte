<script lang="ts">
	import type { SeaBattle } from '../../../graphql/types/sea-battle';
	import SeaBattleItem from './SeaBattleItem.svelte';
	import { EyeSolid } from 'svelte-awesome-icons';

	export let items: SeaBattle[] = [];
</script>

<div class="sea-battle-items">
	<div class="sea-battle-header">
		<div><EyeSolid /></div>
		<div class="user">User</div>
		<div class="score">Score</div>
		<div class="status">Status</div>
		<div class="axis">Axis</div>
	</div>
	{#each items as item}
		<SeaBattleItem {item} />
	{/each}
</div>

<style>
	div.sea-battle-header {
		@apply flex flex-wrap justify-between px-2 bg-blue-400 py-1 font-bold;
	}
	div.user {
		@apply w-48;
	}
	div.score {
		@apply w-24 text-center;
	}
	div.status {
		@apply w-24 text-center;
	}
	div.axis {
		@apply w-24 text-right;
	}
</style>
