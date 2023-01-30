<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { BackwardSolid } from 'svelte-awesome-icons';
	import { YACHT } from '../../../../graphql/queries/yacht';
	import type { Yacht } from '../../../../graphql/types/yacht';
	import { graphQlClient } from '../../../../lib';
	import { Loader } from '../../../../lib/loader';
	import ScoreCard from '../../ScoreCard.svelte';

	let id = $page.params.id;
	console.log({ id });

	let game: Yacht = {};

	const getYacht = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(YACHT, { id: parseInt(String(id)) })
			.then((result) => {
				game = result.yacht;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	onMount(() => {
		getYacht();
	});
</script>

<svelte:head>
	<title>Yacht</title>
</svelte:head>

<div class="back-link">
	<a href="/yacht/scores">
		<BackwardSolid class="mr-2" /> BACK
	</a>
</div>

<div class="yacht">
	<div class="mb-2">
		<strong>User</strong>
		{game.User ? game.User.UserName : 'Anonymous'}
	</div>

	<div class="mb-2">
		<strong>Total</strong>
		{#if game.Total}
			{game.Total}
		{/if}
	</div>

	<ScoreCard {game} />
</div>

<style>
	div.back-link {
		@apply mx-2 mb-4;
	}
	div.back-link a {
		@apply flex;
	}
	div.yacht {
		@apply border border-black rounded p-2 mx-2;
	}
</style>
