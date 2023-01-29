<script lang="ts">
	import { page } from '$app/stores';
	import type { HangMan } from '../../../../graphql/types/hang-man';
	import { BackwardSolid } from 'svelte-awesome-icons';
	import { graphQlClient } from '$lib';
	import { HANG_MAN } from '../../../../graphql/queries/hang-man';
	import { Loader } from '$lib/loader';
	import { onMount } from 'svelte';

	let id = $page.params.id;
	console.log({ id });

	let game: HangMan = {};

	const getHangMan = () => {
		Loader.set({ loading: true });
		graphQlClient
			.request(HANG_MAN, { id: parseInt(String(id)) })
			.then((result) => {
				game = result.hangMan;
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	onMount(() => {
		getHangMan();
	});
</script>

<div class="back-link">
	<a href="/hangman/scores">
		<BackwardSolid class="mr-2" /> BACK
	</a>
</div>

<div class="hang-man">
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

	<div class="mb-2">
		<strong>Word</strong>
		{game.Word ? game.Word.Word : ''}
	</div>

	<div class="mb-2">
		<strong>Length</strong>
		{game.Word ? game.Word.Length : ''}
	</div>

	<div class="mb-2">
		<strong>Correct</strong>
		{#if game.Correct}
			{game.Correct.join(', ')}
		{/if}
	</div>

	<div class="mb-2">
		<strong>Wrong</strong>
		{#if game.Wrong}
			{game.Wrong.join(', ')}
		{/if}
	</div>
</div>

<style>
	div.back-link {
		@apply mx-2 mb-4;
	}
	div.back-link a {
		@apply flex;
	}
	div.hang-man {
		@apply mx-2 border border-black rounded p-2;
	}
</style>
