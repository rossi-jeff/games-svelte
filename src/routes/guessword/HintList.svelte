<script lang="ts">
    export let hints: string[] = []
</script>

<div class="hint-list">
    {#each hints as hint}
        <div class="hint">{hint}</div>
    {/each}
</div>

<style>
    div.hint-list {
        @apply ml-2 flex flex-wrap;
    }
    div.hint {
        @apply p-2 mr-2 mb-2 uppercase;
    }
</style>