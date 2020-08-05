<script>
  import Grid from "svelte-grid";
  import { v4 as uuid } from "uuid";
  import gridHelp from "svelte-grid/src/utils/helper";

  import { currentId, editMode } from "../../../stores/panels";
  // import { grids } from "../../../stores/grids";

  let grids = {};
  let items = [];

  remote.getAllGrids().then(storedGrids => {
    grids = storedGrids;
    grids[$currentId] || [];
  });

  // $: items = grids[$currentId] || [];
  // $: remote.saveGrid({ id: $currentId, items });
  // $: console.log({ id: $currentId, items });

  $: if ($currentId) {
    // items = grids[$currentId];
    console.log($currentId, grids);
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
    color: "#424242",
    icon: null,
    label: null
  };

  function editableItem() {
    return {
      static: !$editMode,
      resizable: $editMode,
      draggable: $editMode
    };
  }

  function createItem() {
    return { id: uuid(), ...defaultItem, ...editableItem() };
  }

  export function addItem() {
    const { cols } = gridOptions;
    const newItem = gridHelp.item(createItem());
    const oldItems = gridHelp.findSpaceForItem(newItem, items, cols);
    items = [...items, ...[{ ...newItem, ...oldItems }]];
  }

  export function adjust() {
    const { cols } = gridOptions;
    items = gridHelp.resizeItems(items, cols);
  }
</script>

<Grid bind:items let:item {...gridOptions}>
  {item.id}
</Grid>
