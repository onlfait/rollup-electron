<script>
  import Grid from "svelte-grid";
  import { v4 as uuid } from "uuid";
  // import Item from "./Item.svelte";
  import Button from "../Button.svelte";
  import { grids } from "../../stores/grids";
  import gridHelp from "svelte-grid/src/utils/helper";
  import { debounce } from "throttle-debounce";

  export let panel = null;

  let editGrid = false;
  let items = [];

  const saveGrid = debounce(1000, (items) => {
    remote.saveGrid({ id: panel.id, items });
  });

  $: {
    items = (panel && $grids && $grids[panel.id]) || [];
    saveGrid(items);
  }

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
    color: "#333",
    icon: null
  };

  function editableItem() {
    return {
      static: !editGrid,
      resizable: editGrid,
      draggable: editGrid
    };
  }

  function createItem() {
    return { id: uuid(), ...defaultItem, ...editableItem() };
  }

  function addItem() {
    const { cols } = gridOptions;
    const newItem = gridHelp.item(createItem());
    const oldItems = gridHelp.findSpaceForItem(newItem, items, cols);
    items = [...items, ...[{ ...newItem, ...oldItems }]];
    $grids[panel.id] = items;
  }

  function adjustGrid() {
    const { cols } = gridOptions;
    items = gridHelp.resizeItems(items, cols);
  }
</script>

<div class="p-2">
  <Button on:click={adjustGrid}>Adjust grid</Button>
  <Button on:click={addItem}>Add item</Button>
</div>

<div class="flex-auto overflow-auto p-2">
  <Grid bind:items let:item {...gridOptions}>
    {item.id}
  </Grid>
</div>
