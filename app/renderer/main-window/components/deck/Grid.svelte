<script>
  import Grid from "svelte-grid";
  import { v4 as uuid } from "uuid";
  import GridItem from "./GridItem.svelte";
  import { grids } from "../../stores/grids";
  import gridHelp from "svelte-grid/src/utils/helper";
  import { createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";

  export let panel = null;
  export let editMode = false;

  const dispatch = createEventDispatcher();

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
    icon: null,
    label: null
  };

  function editableItem() {
    return {
      static: !editMode,
      resizable: editMode,
      draggable: editMode
    };
  }

  function createItem() {
    return { id: uuid(), ...defaultItem, ...editableItem() };
  }

  function updateGrids() {
    $grids[panel.id] = items;
  }

  export function addItem() {
    const { cols } = gridOptions;
    const newItem = gridHelp.item(createItem());
    const oldItems = gridHelp.findSpaceForItem(newItem, items, cols);
    items = [...items, ...[{ ...newItem, ...oldItems }]];
    updateGrids();
  }

  export function adjust() {
    const { cols } = gridOptions;
    items = gridHelp.resizeItems(items, cols);
    updateGrids();
  }

  export function toggleEditMode(enabled = null) {
    editMode = enabled === null ? !editMode : enabled;
    items = items.map(item => ({ ...item, ...editableItem() }));
    dispatch("editMode", editMode);
    updateGrids();
  }

  function removeItem(id) {
    items = items.filter(item => item.id !== id);
    updateGrids();
  }
</script>

<div class="flex-auto overflow-auto p-2">
  <Grid bind:items let:item {...gridOptions}>
    <GridItem {item} {editMode} on:remove={removeItem.bind(null, item.id)} />
  </Grid>
</div>
