<script lang="ts">
	import type { Yacht } from '../../../graphql/types/yacht';
	import { EyeSolid } from 'svelte-awesome-icons';

	export let item: Yacht = {};
</script>

<div class="yacht-item">
	<div>
		<a href="/yacht/scores/{item.Id}">
			<EyeSolid />
		</a>
	</div>
	<div class="user">{item.User ? item.User.UserName : 'Anonymous'}</div>
	<div class="score">{item.Total ?? 0}</div>
</div>

<style>
	div.yacht-item {
		@apply flex flex-wrap justify-between px-2 border border-b-gray-500 border-dashed mb-2;
	}
</style>
