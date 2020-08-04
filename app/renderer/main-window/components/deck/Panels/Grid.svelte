<script>
  import Grid from "svelte-grid";

  import { panels, currentId } from "../../../stores/panels";
  import { grids } from "../../../stores/grids";

  let items = [];

  $: items = findItems($currentId);

  let gridOptions = {
    gap: 4,
    cols: 10,
    rowHeight: 50,
    fillEmpty: false,
    useTransform: true
  };

  function findItems(id) {
    return $grids[id] || [];
  }
</script>

{#if items.length}
<Grid bind:items let:item {...gridOptions}>
  {item.id}
</Grid>
{:else if $panels.length}
<div class="p-2">
  No item added, click on the cog above to add your first power.
</div>
{/if}
