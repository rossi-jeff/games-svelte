<script lang="ts">
	import { graphQlClient } from '$lib';
	import { onMount } from 'svelte';
	import { WORD_RANDOM } from '../../graphql/queries/word-random';
	export let data = {};

	const lengths = [4, 5, 6, 7, 8, 9, 10, 11, 12];
	const filter = {
		Length: 5
	};

	const getWord = () => {
		graphQlClient
			.request(WORD_RANDOM, { filter })
			.then((result) => {
				console.log(result);
				data = result.wordRandom;
			})
			.catch((e) => console.error(e));
	};

	onMount(() => getWord());
</script>

<div>
	{JSON.stringify(data, undefined, 2)}
</div>

<select name="length" id="length" bind:value={filter.Length} on:change={getWord}>
	{#each lengths as l}
		<option value={l}>{l}</option>
	{/each}
</select>

<button on:click={getWord}>Get Another Word</button>
