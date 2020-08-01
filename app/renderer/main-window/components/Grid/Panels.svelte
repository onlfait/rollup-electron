<script>
  import Grid from "svelte-grid";
  import { v4 as uuid } from "uuid";
  import Item from "./Item.svelte";
  import Button from "../Button.svelte";
  import { items, editGrid } from "../../stores/grid";
  import gridHelp from "svelte-grid/src/utils/helper";

  let gridOptions = {
    gap: 4,
    cols: 10,
    rowHeight: 50,
    fillEmpty: false,
    useTransform: true
  };

  const defaultItem =  {
    x: 0, y: 0,
    w: 2, h: 2,
    min: { w: 2, h: 2 },
    icon: null
  };

  function editableItem() {
    return {
      static: !$editGrid,
      resizable: $editGrid,
      draggable: $editGrid
    };
  }

  function toggleEditGrid() {
    $editGrid = !$editGrid;
    $items = $items.map(item => ({ ...item, ...editableItem() }));
  }

  function adjustGrid() {
    const { cols } = gridOptions;
    $items = gridHelp.resizeItems($items, cols);
  }

  function createItem() {
    return { id: uuid(), ...defaultItem, ...editableItem() };
  }

  function addGridItem() {
    const { cols } = gridOptions;
    const newItem = gridHelp.item(createItem());
    const oldItems = gridHelp.findSpaceForItem(newItem, $items, cols);
    $items = [...$items, ...[{ ...newItem, ...oldItems }]];
  }
</script>

<div class="p-2">
  <Button on:click={toggleEditGrid}>
    {$editGrid ? "⨞" : "◳"}
    {$editGrid ? "Back" : "Edit"}
  </Button>
  {#if $editGrid}
  <Button on:click={adjustGrid}>Adjust grid</Button>
  <Button on:click={addGridItem}>Add item</Button>
  {/if}
</div>

<Grid bind:items={$items} let:item {...gridOptions}>
  <Item {item} />
</Grid>
