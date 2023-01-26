<script lang="ts">
	import type { GuessWord } from '../../../graphql/types/guess-word';

	export let item: GuessWord = {};
</script>

<div class="guess-word-item">
	<div class="user">{item.User ? item.User.UserName : 'Anonymous'}</div>
	<div class="score">{item.Score}</div>
	<div class="word">
		{#if item.Word && item.Word.Word}
			{item.Word.Word}
		{/if}
	</div>
	<div class="length">
		{#if item.Word && item.Word.Length}
			{item.Word.Length}
		{/if}
	</div>
</div>

<style>
	div.guess-word-item {
		@apply flex flex-wrap justify-between px-2 border border-b-gray-500 border-dashed mb-2;
	}
	div.user {
		@apply w-48;
	}
	div.score {
		@apply w-24 text-center;
	}
	div.word {
		@apply w-24 text-center;
	}
	div.length {
		@apply w-24 text-right;
	}
</style>
