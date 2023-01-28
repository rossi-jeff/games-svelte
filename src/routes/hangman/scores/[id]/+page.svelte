<script lang="ts">
	import { page } from '$app/stores';
	import { BackwardSolid } from 'svelte-awesome-icons';

	let id = $page.params.id;
	console.log({ id });
</script>

<div class="back-link">
	<a href="/hangman/scores">
		<BackwardSolid class="mr-2" /> BACK
	</a>
</div>

<style>
	div.back-link {
		@apply mx-2 mb-4;
	}
	div.back-link a {
		@apply flex;
	}
</style>
