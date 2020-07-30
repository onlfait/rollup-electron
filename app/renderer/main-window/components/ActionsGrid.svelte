<script>
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/src/utils/helper";

  import { darkMode } from "../stores.js";

  import "../styles/actions-grid.css";

  let gap = 5;
  let cols = 10;
  let rowHeight = 50;
  let min = { w: 1, h: 2 };

  const id = () => "_" + Math.random().toString(36).substr(2, 9);

  $: boxClass = `
    border-gray-${$darkMode ? "800" : "400"}
    bg-gray-${$darkMode ? "900" : "300"}
    text-gray-${$darkMode ? "300" : "800"}`;

  let items = [
    gridHelp.item({ x: 0, y: 0, w: 5, h: 2, id: id(), min }),
    gridHelp.item({ x: 5, y: 0, w: 5, h: 2, id: id(), min }),
    gridHelp.item({ x: 0, y: 2, w: 5, h: 2, id: id(), min }),
    gridHelp.item({ x: 5, y: 2, w: 5, h: 2, id: id(), min })
  ];

  function add() {
    let newItem = gridHelp.item({ w: 2, h: 2, id: id(), min});
    let findOutPosition = gridHelp.findSpaceForItem(newItem, items, cols);
    items = [...items, ...[{ ...newItem, ...findOutPosition }]];
  }

  // items[2].resizable = false;
  // items[2].draggable = false;
  // items[2].static = true;
  // items = [...items];
</script>

<div class="p-2 mx-1">
  <button
    class="px-2 text-gray-200 bg-pink-900 rounded"
    on:click={add}>Add widget</button>
</div>

<Grid bind:items let:item {cols} {rowHeight} {gap} fillEmpty={false}>
  <div class="flex p-2 h-full rounded-md border-2 {boxClass}">
    {item.id}
  </div>
</Grid>
