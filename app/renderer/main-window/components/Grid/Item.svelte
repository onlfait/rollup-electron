<script>
  import { items, editGrid, editItem } from "../../stores/grid";

  export let item = null;

  function removeItem() {
    $items = $items.filter(i => i.id !== item.id);
  }

  function setEditItem() {
    if (!$editGrid) return;
    editItem.set(item);
  }

  $: iconClass = item.icon ? `background-image: url("/public/grid-icons/${item.icon.name}");` : "";
</script>

<div class="flex h-full bg-center bg-no-repeat bg-cover" style="{iconClass} background-color: {item.color};" on:dblclick={setEditItem}>
  {#if $editGrid}
  <span
    on:click={removeItem}
    class="absolute hover:bg-red-900 hover:text-gray-300 text-xs right-0 px-1 cursor-pointer"
  >✕</span>
  {/if}
</div>
