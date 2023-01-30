<script>
	import '../app.css';
	import Footer from './Footer.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import NavBar from './NavBar.svelte';
	import PageTitle from './PageTitle.svelte';
</script>

<svelte:head>
	<title>Games by Jeff Rossi</title>
</svelte:head>

<LoadingSpinner />

<PageTitle />

<NavBar />

<div class="body-scroller">
	<slot />
</div>

<div class="spacer" />

<Footer />

<style>
	div.body-scroller {
		@apply overflow-y-auto;
	}
	div.spacer {
		@apply h-24;
	}
</style>
