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
				drawHangMan();
				Loader.set({ loading: false });
			})
			.catch((e) => console.error(e));
	};

	const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

	const drawHangMan = () => {
		if (!game.Wrong || !game.Wrong.length) return;
		const max: number = Math.min(parts.length, game.Wrong.length);
		let partId: string, el;
		for (let i = 0; i < max; i++) {
			partId = parts[i];
			if (partId) {
				el = document.getElementById(partId);
				if (el) el.classList.add('visible');
			}
		}
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

	<div id="hangman-graphic">
		<div id="gallows-top" />
		<div id="gallows-side" />
		<div id="gallows-bottom" />
		<div id="rope" />
		<div id="head" />
		<div id="body" />
		<div id="left-arm" />
		<div id="right-arm" />
		<div id="left-leg" />
		<div id="right-leg" />
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
	div#hangman-graphic {
		@apply w-72 h-96 border rounded border-black ml-2 relative p-0;
	}
	div#gallows-top {
		@apply w-40 h-8 bg-black absolute top-4 left-4;
	}
	div#gallows-side {
		@apply w-8 h-72 bg-black absolute top-12 left-6;
	}
	div#gallows-bottom {
		@apply h-8 w-64 bg-black absolute left-2 bottom-4;
	}
	div#rope {
		@apply w-4 h-8 bg-gray-600 absolute top-12 left-36;
	}
	div#head {
		@apply w-12 h-12  bg-gray-300 rounded-full absolute top-20 left-32 invisible;
	}
	div#body {
		@apply w-24 h-24  bg-gray-300 rounded-full absolute top-32 left-[105px] invisible;
	}
	div#left-arm {
		@apply w-14 h-6  bg-gray-300 absolute  top-36 left-[68px] invisible;
	}
	div#right-arm {
		@apply w-14 h-6  bg-gray-300 absolute top-36 left-[185px] invisible;
	}
	div#left-leg {
		@apply w-6 h-28  bg-gray-300 absolute top-52 left-[115px] invisible;
	}
	div#right-leg {
		@apply w-6 h-28  bg-gray-300 absolute top-52 left-[165px] invisible;
	}
</style>
