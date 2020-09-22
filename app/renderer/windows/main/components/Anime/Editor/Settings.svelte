<script>
  import Icon from "../../Icon.svelte";
  import { getAnimeIcon } from "../libs/anime";

  export let animes;
  export let currentAnime;
</script>

{#if currentAnime}
<div class="p-2 flex space-x-2 bg-primary-dark">
  <Icon icon={getAnimeIcon(currentAnime.type)} class="w-4 h-4 flex-shrink-0" />
  <div class="truncate">{currentAnime.filename}</div>
</div>
{:else}
<div class="p-2 truncate bg-primary-dark">
  No files added/selected...
</div>
<div class="p-2">
  Drag/Drop some file on the timeline ;)
</div>
{/if}
