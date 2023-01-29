<script lang="ts">
	import type { SeaBattle } from '../../../graphql/types/sea-battle';
	import { EyeSolid } from 'svelte-awesome-icons';

	export let item: SeaBattle = {};
</script>

<div class="sea-battle-item">
	<div>
		<a href="/seabattle/scores/{item.Id}">
			<EyeSolid />
		</a>
	</div>
	<div class="user">{item.User ? item.User.UserName : 'Anonymous'}</div>
	<div class="score">{item.Score}</div>
	<div class="status">{item.Status}</div>
	<div class="axis">{item.Axis}</div>
</div>

<style>
	div.sea-battle-item {
		@apply flex flex-wrap justify-between px-2 border border-b-gray-500 border-dashed mb-2;
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
