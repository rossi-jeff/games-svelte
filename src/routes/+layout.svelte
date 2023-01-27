<script>
	import '../app.css';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import NavBar from './NavBar.svelte';
	import PageTitle from './PageTitle.svelte';
</script>

<LoadingSpinner />

<PageTitle />

<NavBar />

<slot />
