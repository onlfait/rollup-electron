<script>
  import Grid from "svelte-grid";
  import { _ } from "../../../../i18n"
  import gridOptions from "./gridOptions"
  import GridItem from "./GridItem.svelte";
  import { panels, currentId, editMode } from "../../stores/deck";

  let panel = null;

  $: if ($panels) {
    panel = getCurrentPanel();
  }

  function getPanelById(id) {
    return $panels.find(panel => panel.id === id);
  }

  function getCurrentPanel() {
    return getPanelById($currentId);
  }

  function editGridItem(item) {
    console.log("editGridItem", item);
  }

  function removeGridItem(item) {
    console.log("removeGridItem", item);
  }

</script>

{#if panel}

  {#if !panel.widgets.length}
  <div class="p-2">
    {_('sentences.noWidgetsFound')}
  </div>
  {:else}
  <div class="flex-auto overflow-auto p-1">
    <Grid bind:items={panel.widgets} let:item {...gridOptions}>
      <GridItem {item} editMode={$editMode}
        on:edit={editGridItem.bind(null, item)}
        on:remove={removeGridItem.bind(null, item)}
      />
    </Grid>
  </div>
  {/if}

{/if}
