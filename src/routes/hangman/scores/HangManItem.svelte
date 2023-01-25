<script lang="ts">
	import type { HangMan } from '../../../graphql/types/hang-man';

	export let item: HangMan = {};
</script>

<div class="hang-man-item">
	<div class="user">{item.User ? item.User.UserName : 'Anonymous'}</div>
	<div class="score">{item.Score}</div>
	<div class="correct">
		{#if item.Correct && item.Correct.length}
			{item.Correct.join(', ')}
		{/if}
	</div>
	<div class="wrong">
		{#if item.Wrong && item.Wrong.length}
			{item.Wrong.join(', ')}
		{/if}
	</div>
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
	div.hang-man-item {
		@apply flex flex-wrap justify-between px-2 border border-b-gray-500 border-dashed mb-2;
	}
	div.user {
		@apply w-48;
	}
	div.score {
		@apply w-24 text-center;
	}
	div.correct {
		@apply w-24 text-center;
	}
	div.wrong {
		@apply w-24 text-center;
	}
	div.word {
		@apply w-32 text-center;
	}
	div.length {
		@apply w-24 text-right;
	}
</style>
