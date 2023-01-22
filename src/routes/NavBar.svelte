<script lang="ts">
	import { page } from '$app/stores';
	let routes = [
		{ name: 'Home', path: '/' },
		{ name: 'Code Breaker', path: '/codebreaker' },
		{ name: 'Guess Word', path: '/guessword' },
		{ name: 'Hangman', path: '/hangman' },
		{ name: 'Sea Battle', path: '/seabattle' },
		{ name: 'Yacht', path: '/yacht' }
	];
</script>

<div class="nav-bar">
	{#each routes as route}
		<a href={route.path} class:active={route.path === $page.url.pathname}>{route.name}</a>
	{/each}
</div>

<style>
	div.nav-bar {
		@apply border border-blue-900 bg-blue-600 rounded p-2 mx-2 my-4 flex flex-wrap;
	}
	div.nav-bar a {
		@apply no-underline text-white font-bold mr-4 px-2 py-1;
	}
	div.nav-bar a:hover {
		@apply underline text-yellow-300;
	}
	:global(div.nav-bar a.active) {
		@apply bg-blue-900 rounded;
	}
</style>
