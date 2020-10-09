<script>
  import { getContext } from "svelte";
  import AnimeIcon from "./AnimeIcon.svelte";

  const { items, selectedItem } = getContext("Editor");
</script>

{#if $selectedItem}
  <div class="flex pl-2 items-center space-x-2 bg-primary-dark">
    <AnimeIcon type={$selectedItem.target.type} />
    <div class="p-2 pl-0 truncate flex-1">{$selectedItem.target.name}</div>
  </div>
  <div class="p-2">
    ...
  </div>
{:else if $items.length}
  <div class="p-2 truncate bg-primary-dark">
    No file selected...
  </div>
{:else}
  <div class="p-2 truncate bg-primary-dark">
    No files added...
  </div>
  <div class="p-2">
    Drop some file on the timeline ;)
  </div>
{/if}
