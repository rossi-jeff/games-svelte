<script lang="ts">
	import { CODE_BREAKERS_PAGINATED } from '../../../graphql/queries/code-breakers-paginated';
	import type { CodeBreakersPaginated } from '../../../graphql/types/code-breakers-paginated';
	import { OrderBy } from '../../../graphql/types/order-by';
	import { graphQlClient } from '../../../lib';
	import { onMount } from 'svelte';
	import CodeBreakerItems from './CodeBreakerItems.svelte';

	let skip = 0;
	let take = 10;
	let orderBy = {
		Score: OrderBy.Desc
	};
	let pagedResults: CodeBreakersPaginated = {};

	const getCodeBreakers = () => {
		graphQlClient
			.request(CODE_BREAKERS_PAGINATED, {
				OrderBy: orderBy,
				Skip: skip,
				Take: take
			})
			.then((result) => {
				pagedResults = result.codeBreakers;
			})
			.catch((e) => console.error(e));
	};

	onMount(() => {
		getCodeBreakers();
	});
</script>

<div class="code-breaker-scores">
	<h2>Code Breaker Scores</h2>
	{#if pagedResults && pagedResults.Items && pagedResults.Items.length}
		<CodeBreakerItems items={pagedResults.Items} />
	{/if}
</div>

<style>
	div.code-breaker-scores {
		@apply whitespace-pre p-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
