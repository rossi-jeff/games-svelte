<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let take = 10;
	export let count = 0;

	const perPages = [5, 10, 25];
	let drawn: boolean = false;
	let pages: number[] = [];
	let currentPage: number = 1;

	const dispatch = createEventDispatcher();

	const buildPages = () => {
		let idx = 0;
		let page = 1;
		pages = [];
		drawn = false;
		while (idx < count) {
			pages.push(page);
			page++;
			idx += take;
		}
		drawn = true;
	};

	const setPage = (page: number) => {
		currentPage = page;
		buildPages();
		changePage();
	};

	const perPageChanged = () => {
		currentPage = 1;
		buildPages();
		changePage();
	};

	const changePage = () => {
		dispatch('changePage', { PerPage: take, CurrentPage: currentPage });
	};

	onMount(() => {
		buildPages();
	});
</script>

<div class="pagination">
	<div class="per-page">
		<strong>Per Page:</strong>
		<select
			name="per-page-select"
			id="per-page-select"
			bind:value={take}
			on:change={perPageChanged}
		>
			{#each perPages as perPage}
				<option value={perPage} selected={perPage === take}>{perPage}</option>
			{/each}
		</select>
	</div>
	<div class="pages">
		{#if drawn}
			{#each pages as page}
				{#if page === currentPage}
					<div class="current-page">{page}</div>
				{:else}
					<button on:click={() => setPage(page)}>{page}</button>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<style>
	div.pagination {
		@apply flex justify-between mt-4 mx-2;
	}
	div.pages {
		@apply flex flex-wrap;
	}
	div.current-page {
		@apply border border-blue-900 py-1 px-2 rounded-full font-bold bg-blue-700 text-white ml-1 mb-1;
	}
	div.pages button {
		@apply border border-blue-900 text-blue-900 py-1 px-2 rounded-full bg-blue-200 ml-1 mb-1;
	}
	div.pages button:hover {
		@apply bg-blue-500;
	}
	div.per-page strong {
		@apply mr-2;
	}
	select {
		@apply border border-blue-900 text-blue-900 py-0 px-1 rounded;
	}
	option {
		@apply text-blue-900;
	}
</style>
