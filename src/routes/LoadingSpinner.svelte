<script lang="ts">
	import { Loader } from '$lib/loader';
	import { SpinnerSolid } from 'svelte-awesome-icons';
</script>

{#if $Loader.loading}
	<div id="loader-overlay">
		<div class="loader-display">
			<SpinnerSolid class="w-36 h-36 mb-8 animate-spin text-blue-600" />
			<div class="text-2xl text-blue-600 font-bold tracking-widest">Loading ...</div>
		</div>
	</div>
{/if}

<style>
	div#loader-overlay {
		@apply bg-gray-500 bg-opacity-70 w-full h-full overflow-y-auto fixed inset-0;
	}
	div.loader-display {
		@apply w-48 mx-auto my-auto  relative top-56 text-center;
	}
</style>
