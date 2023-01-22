<script lang="ts">
	export let availableColors: string[];
	export let i: number;
	export let selected: string[] = [];
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const checkComplete = () => {
		dispatch('checkComplete');
	};
</script>

<select id="select-{i}" bind:value={selected[i]} on:change={checkComplete}>
	<option value=""> - select - </option>
	{#each availableColors as color}
		<option value={color} class={color}>{color}</option>
	{/each}
</select>

<style>
	:global(.Black) {
		@apply bg-black border-black text-white h-8;
	}
	:global(.Blue) {
		@apply bg-blue-700 border-blue-900 text-white;
	}
	:global(.Brown) {
		@apply bg-amber-800 border-amber-900 text-white;
	}
	:global(.Green) {
		@apply bg-green-500 border-green-900;
	}
	:global(.Orange) {
		@apply bg-orange-400 border-orange-900;
	}
	:global(.Purple) {
		@apply bg-purple-600 border-purple-900;
	}
	:global(.Red) {
		@apply bg-red-600 border-red-900;
	}
	:global(.White) {
		@apply bg-white border-black;
	}
	:global(.Yellow) {
		@apply bg-yellow-300 border-yellow-900;
	}
</style>
