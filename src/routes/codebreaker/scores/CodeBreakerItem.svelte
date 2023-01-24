<script lang="ts">
	import type { CodeBreaker } from '../../../graphql/types/code-breaker';

	export let item: CodeBreaker = {};
</script>

<div class="code-breaker">
	<div class="user">{item.User ? item.User.UserName : 'Anonymous'}</div>
	<div class="score">{item.Score}</div>
	<div class="status">{item.Status}</div>
	<div class="columns">{item.Columns}</div>
	<div class="colors">{item.Colors}</div>
</div>

<style>
	div.code-breaker {
		@apply flex flex-wrap justify-between px-2 border border-b-gray-500 border-dashed mb-2;
	}
	div.user {
		@apply w-48;
	}
	div.score {
		@apply text-center w-24;
	}
	div.status {
		@apply text-center w-24;
	}
	div.columns {
		@apply text-center w-24;
	}
	div.colors {
		@apply text-right w-24 px-2;
	}
</style>
