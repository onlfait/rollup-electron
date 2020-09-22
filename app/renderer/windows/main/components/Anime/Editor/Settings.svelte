<script>
  export let animes;
  export let currentAnime;
</script>

{#if currentAnime}
<div class="p-2 truncate">
  {currentAnime.filename}
</div>
{:else}
<div class="p-2 truncate">
  No files added/selected...<br />
  Drag/Drop some file on the timeline ;)
</div>
{/if}
