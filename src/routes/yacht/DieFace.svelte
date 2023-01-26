<script lang="ts">
	export let face: number = 1;
	export let side: number = 64;
	let folder = '/dice';
	const src = `${folder}/dice-${face}.svg`;
	const alt = `Die ${face}`;
</script>

<img {src} {alt} width="{side}px" height="{side}px" />
