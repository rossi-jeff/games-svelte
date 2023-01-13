<script lang="ts">
	import { graphQlClient } from '$lib';
	import { onMount } from 'svelte';
	import { WORD_RANDOM } from '../../graphql/queries/word-random';
	export let data = {};
	const filter = {
		Min: 6,
		Max: 12
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

<button on:click={getWord}>Get Another Word</button>
