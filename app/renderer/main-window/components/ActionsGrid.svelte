<script>
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/src/utils/helper";
  import { v4 as uuid } from "uuid";

  import { darkMode } from "../stores.js";

  import "../styles/actions-grid.css";

  let items = [];
  let editMode = false;

  let gridOptions = {
    gap:5,
    cols:10,
    rowHeight:50,
    fillEmpty:false,
    useTransform:true
  };

  const defaultItem =  {
    x: 0, y: 0,
    w: 2, h: 2,
    min: { w: 2, h: 2 }
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

  $: boxClass = `
    border-gray-${$darkMode ? "800" : "400"}
    bg-gray-${$darkMode ? "900" : "300"}
    text-gray-${$darkMode ? "300" : "800"}`;


  function add() {
    const { cols } = gridOptions;
    const newItem = gridHelp.item(createItem());
    const oldItems = gridHelp.findSpaceForItem(newItem, items, cols);
    items = [...items, ...[{ ...newItem, ...oldItems }]];
  }

  function remove(item) {
    items = items.filter(i => i.id !== item.id);
  }

  function adjust() {
    const {cols} = gridOptions;
    items = gridHelp.resizeItems(items, cols);
  }

  function edit() {
    editMode = !editMode;
    items = items.map(item => ({ ...item, ...editableItem() }));
    remote.saveGridItems(items);
  }

  remote.getGridItems().then(gridItems => {
    items = gridItems.map(item => ({...item, ...editableItem() }));
  });
</script>

<div class="p-2 mx-1">
  <button
    class="px-2 text-gray-200 bg-pink-900 rounded"
    on:click={edit}>{editMode ? "✕" : "Edit grid"}</button>
  {#if editMode}
  <button
    class="px-2 text-gray-200 bg-pink-900 rounded"
    on:click={adjust}>Adjust grid</button>
  <button
    class="px-2 text-gray-200 bg-pink-900 rounded"
    on:click={add}>Add widget</button>
  {/if}
</div>

<Grid bind:items let:item {...gridOptions}>
  <div class="flex h-full rounded-md border-2 {boxClass}">
    {#if editMode}
    <span on:click={remove.bind(null, item)} class=close>✕</span>
    {/if}
    {item.id}
  </div>
</Grid>
