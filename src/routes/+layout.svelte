<script>
	import '../app.css';
	import Footer from './Footer.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import NavBar from './NavBar.svelte';
	import PageTitle from './PageTitle.svelte';
</script>

<LoadingSpinner />

<PageTitle />

<NavBar />

<div class="body-scroller">
	<slot />
</div>

<Footer />

<style>
	div.body-scroller {
		@apply overflow-y-auto;
	}
</style>
