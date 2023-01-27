<script lang="ts">
	import { CODE_BREAKERS_PAGINATED } from '../../../graphql/queries/code-breakers-paginated';
	import type { CodeBreakersPaginated } from '../../../graphql/types/code-breakers-paginated';
	import { OrderBy } from '../../../graphql/types/order-by';
	import { graphQlClient } from '../../../lib';
	import { onMount } from 'svelte';
	import CodeBreakerItems from './CodeBreakerItems.svelte';
	import Pagination from '../../Utilities/Pagination.svelte';
	import { Loader } from '$lib/loader';

	let skip: number = 0;
	let take: number = 10;
	let count: number = 0;
	let orderBy = {
		Score: OrderBy.Desc
	};
	let pagedResults: CodeBreakersPaginated = {};

	const getCodeBreakers = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(CODE_BREAKERS_PAGINATED, {
				OrderBy: orderBy,
				Skip: skip,
				Take: take
			})
			.then((result) => {
				pagedResults = result.codeBreakers;
				take = pagedResults.Take ?? 10;
				skip = pagedResults.Skip ?? 0;
				count = pagedResults.Count ?? 0;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const pageChanged = (event: any) => {
		console.log(event.detail);
		const { PerPage, CurrentPage } = event.detail;
		if (PerPage && CurrentPage) {
			take = PerPage;
			skip = (CurrentPage - 1) * PerPage;
			getCodeBreakers();
		}
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

{#if pagedResults && pagedResults.Items && pagedResults.Items.length}
	<Pagination {take} {count} on:changePage={pageChanged} />
{/if}

<style>
	div.code-breaker-scores {
		@apply mx-2;
	}
	h2 {
		@apply text-xl font-bold;
	}
</style>
