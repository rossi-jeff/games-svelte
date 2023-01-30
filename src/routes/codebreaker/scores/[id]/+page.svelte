<script lang="ts">
	import { graphQlClient } from '$lib';
	import type { CodeBreaker } from '../../../../graphql/types/code-breaker';
	import { CODE_BREAKER } from '../../../../graphql/queries/code-breaker';
	import type { CodeBreakerCode } from '../../../../graphql/types/code-breaker-code';
	import { CODE_BREAKER_SOLUTION } from '../../../../graphql/queries/code-breaker-solution';
	import { Loader } from '$lib/loader';
	import { onMount } from 'svelte';
	import SolutionDisplay from '../../SolutionDisplay.svelte';
	import { page } from '$app/stores';
	import GuessDisplay from '../../GuessDisplay.svelte';
	import { BackwardSolid } from 'svelte-awesome-icons';

	let id = $page.params.id;

	let game: CodeBreaker = {};
	let solution: CodeBreakerCode[] = [];

	const getCodeBreaker = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(CODE_BREAKER, { id: parseInt(String(id)) })
			.then((result) => {
				game = result.codeBreaker;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const getSolution = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(CODE_BREAKER_SOLUTION, { id: parseInt(String(id)) })
			.then((result) => {
				solution = result.codeBreakerSolution;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	onMount(() => {
		getCodeBreaker();
		getSolution();
	});
</script>

<svelte:head>
	<title>Code Breaker</title>
</svelte:head>

<div class="back-link">
	<a href="/codebreaker/scores">
		<BackwardSolid class="mr-2" /> BACK
	</a>
</div>

<div class="code-breaker">
	<div class="mb-2">
		<strong>User</strong>
		{game.User ? game.User.UserName : 'Anonymous'}
	</div>

	<div class="mb-2">
		<strong>Status</strong>
		{#if game.Status}
			{game.Status}
		{/if}
	</div>

	<div class="mb-2">
		<strong>Score</strong>
		{#if game.Score}
			{game.Score}
		{/if}
	</div>

	{#if solution && solution.length}
		<h2>Solution</h2>
		<SolutionDisplay {solution} />
	{/if}
	{#if game && game.Guesses}
		<h2>Guesses</h2>
		{#each game.Guesses as guess}
			<GuessDisplay {guess} />
		{/each}
	{/if}
</div>

<style>
	div.code-breaker {
		@apply mx-2 border border-black rounded p-2;
	}
	h2 {
		@apply text-lg font-bold;
	}
	div.back-link {
		@apply mx-2 mb-4;
	}
	div.back-link a {
		@apply flex;
	}
</style>
