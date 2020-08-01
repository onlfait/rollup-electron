<script>
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/src/utils/helper";
  import { v4 as uuid } from "uuid";

  import { darkMode } from "../stores/app";

  import "../styles/actions-grid.css";

  let items = [];
  let editMode = false;
  let currentItem = null;

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
    min: { w: 2, h: 2 },
    icon: null
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

  function setCurrentItem(item) {
    if (!editMode) {
      return;
    }
    currentItem = item;
  }

  function editItem(item) {
    items = items.map(i => {
      if (i.id === item.id) {
        i = { ...i, ...item, ...editableItem() };
      }
      return i;
    });
    remote.saveGridItems(items);
  }

  function onImage(e) {
    const {name,path} = e.target.files[0];
    currentItem = {...currentItem, icon: {name, path}};
    remote.addGridIcon({name, path});
    editItem(currentItem);
  }

  remote.getGridItems().then(gridItems => {
    items = gridItems.map(item => ({...item, ...editableItem() }));
  });
</script>

{#if !currentItem}
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
  <div
    class="flex h-full rounded-md border-2 {boxClass}"
    on:dblclick={setCurrentItem.bind(null, item)}
    style="background-image: {item.icon ? `url(/public/grid-icons/${item.icon.name})` : 'none'}"
  >
    {#if editMode}
    <span on:click={remove.bind(null, item)} class=close>✕</span>
    {/if}
    {item.id}
  </div>
</Grid>
{/if}

{#if currentItem}
  <div class="p-2  mx-1">
    <button
      class="px-2 text-gray-200 bg-pink-900 rounded"
      on:click={setCurrentItem.bind(null, null)}>✕</button>
    <div>
      Editing item #{currentItem.id}
    </div>
    <input type="file" accept="image/*" on:change="{onImage}"/>
    {#if currentItem.icon}
    {currentItem.icon.name}
    {/if}
  </div>
{/if}
