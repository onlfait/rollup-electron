<script>
  import { items } from "../../stores/grid";

  export let item = null;

  function removeGridItem(item) {
    $items = $items.filter(i => i.id !== item.id);
  }
</script>

<span
  on:click={removeGridItem.bind(null, item)}
  class="absolute hover:bg-red-900 text-xs right-0 px-1 cursor-pointer"
>✕</span>
