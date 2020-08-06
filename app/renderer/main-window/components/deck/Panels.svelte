<script>
  import { v4 as uuid } from "uuid";

  import Modal from "../Modal.svelte";
  import Button from "../Button.svelte";
  import HOverflow from "../HOverflow.svelte";
  import InputText from "../InputText.svelte";
  import GridItem from "./GridItem.svelte";

  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdApps from "svelte-icons/md/MdApps.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";

  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/src/utils/helper";

  import { panels } from "../../stores/panels";

  let of = null;
  let panel = null;
  let editItem = null;

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

  $: if ($panels) {
    panel = $panels.panels.find(p => p.id === $panels.currentId);
  }

  $: panel && updatePanel();

  function toggleEditMode() {
    $panels.editMode = !$panels.editMode;
    $panels.panels = $panels.panels.map(panel => {
      panel.widgets = panel.widgets.map(widget => {
        return { ...widget, ...editableItem() };
      });
      return panel;
    });
  }

  function setCurrentId(id) {
    $panels.currentId = id;
  }

  function addPanel() {
    const id = uuid();
    const name = `Powers group n°${$panels.panels.length + 1}`;
    $panels.panels = [...$panels.panels, { id, name, widgets: [] }];
    setCurrentId(id);
    of.scrollRight();
  }

  function removePanel(id) {
    let pos = -1;

    $panels.panels = $panels.panels.filter((panel, i) => {
      if (panel.id === id) {
        pos = i;
        return false;
      }
      return true;
    });

    if (!$panels.panels.length) {
      $panels.currentId = null;
      $panels.editMode = false;
    } else if (pos > -1 && $panels.currentId === id) {
      $panels.currentId = ($panels.panels[pos] || $panels.panels[pos-1]).id;
    }
  }

  function updatePanel() {
    $panels.panels = $panels.panels.map(p => {
      if (p.id === $panels.currentId) {
        return panel;
      }
      return p;
    });
  }

  function editableItem() {
    return {
      static: !$panels.editMode,
      resizable: $panels.editMode,
      draggable: $panels.editMode
    };
  }

  function createItem() {
    return { id: uuid(), ...defaultItem, ...editableItem() };
  }

  function addGridItem() {
    const { cols } = gridOptions;
    const newItem = gridHelp.item(createItem());
    const oldItems = gridHelp.findSpaceForItem(newItem, panel.widgets, cols);
    panel.widgets = [...panel.widgets, ...[{ ...newItem, ...oldItems }]];
  }

  function adjustGrid() {
    const { cols } = gridOptions;
    panel.widgets = gridHelp.resizeItems(panel.widgets, cols);
  }

  function removeGridItem(id) {
    panel.widgets = panel.widgets.filter(widget => widget.id !== id);
  }

  function editGridItem(item) {
    editItem = item;
  }

  function closeEditGrid() {
    editItem = null;
  }
</script>


{#if $panels}

<div class="flex items-center">
  <div class="inline-flex p-2">
    <Button first text="light" on:click={addPanel}>
      <span class="w-6 h-6"><MdAdd /></span>
    </Button>
    <Button last text="light" on:click={toggleEditMode} disabled={!$panels.panels.length} bg={$panels.editMode ? "danger" : "secondary"}>
      <span class="w-6 h-6"><MdSettings /></span>
    </Button>
  </div>
  {#if !$panels.panels.length}
  <div class="p-2">
    No panel found o_O ! Click on the cross to add your first group of powers !
  </div>
  {/if}
  <HOverflow bind:this={of} gap="2">
    {#each $panels.panels as panel}
    <Button noShrink on:click={setCurrentId.bind(null, panel.id)} bg={$panels.currentId === panel.id ? "primary" : "secondary"}>
      {panel.name}
    </Button>
    {/each}
  </HOverflow>
</div>

{#if $panels.editMode}
<div class="bg-secondary flex flex-wrap mx-2 p-1">
  <div class="p-1">
    <Button text="light" on:click={adjustGrid}>
      <span class="w-6 h-6"><MdApps /></span>
      <span class="hidden md:inline md:ml-2">Adjust grid</span>
    </Button>
  </div>
  <div class="p-1">
    <Button text="light" on:click={addGridItem}>
      <span class="w-6 h-6"><MdAddToPhotos /></span>
      <span class="hidden md:inline md:ml-2">Add item</span>
    </Button>
  </div>
  <div class="p-1">
    <InputText
      bind:value={panel.name}
      on:enterKey={toggleEditMode}
    >Rename</InputText>
  </div>
  <div class="p-1">
    <Button bg="danger" text="light" on:click={removePanel.bind(null, $panels.currentId)}>
      <span class="w-6 h-6"><MdDelete /></span>
      <span class="hidden md:inline md:ml-2">Remove panel</span>
    </Button>
  </div>
</div>
{/if}


{#if !panel.widgets.length}
<div class="p-2">
  No widgets found o_O ! Click on the cog button to add your first power !
</div>
{:else}
<div class="flex-auto overflow-auto p-1">
  <Grid bind:items={panel.widgets} let:item {...gridOptions}>
    <GridItem {item} editMode={$panels.editMode}
      on:edit={editGridItem.bind(null, item)}
      on:remove={removeGridItem.bind(null, item.id)}
    />
  </Grid>
</div>
{/if}

{/if}

{#if editItem}
<Modal on:click={closeEditGrid}>
  <div class="p-10 bg-light text-dark rounded overflow-auto shadow">
    <div>Edit {editItem.id}</div>
  </div>
</Modal>
{/if}
