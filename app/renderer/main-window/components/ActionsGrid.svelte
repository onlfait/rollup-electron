<script>
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/src/utils/helper";

  import "../styles/actions-grid.css";

  let gap = 15;
  let cols = 10;
  let rowHeight = 50;
  const id = () => "_" + Math.random().toString(36).substr(2, 9);

  let items = [
    gridHelp.item({ x: 0, y: 0, w: 5, h: 2, id: id() }),
    gridHelp.item({ x: 5, y: 0, w: 5, h: 2, id: id() }),
    gridHelp.item({ x: 0, y: 2, w: 5, h: 2, id: id() }),
    gridHelp.item({ x: 5, y: 2, w: 5, h: 2, id: id() })
  ];
</script>

<Grid bind:items let:item {cols} {rowHeight} {gap}>
  <div class="flex bg-gray-400 h-full rounded">
    {item.id}
  </div>
</Grid>
