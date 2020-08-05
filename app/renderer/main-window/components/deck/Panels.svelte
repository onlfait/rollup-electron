<script>
  import { v4 as uuid } from "uuid";

  import Button from "../Button.svelte";
  import HOverflow from "../HOverflow.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";

  // import InputText from "../../InputText.svelte";
  import MdApps from "svelte-icons/md/MdApps.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";

  import { panels } from "../../stores/panels";

  let of = null;

  $: console.log("$panels:", $panels);

  function toggleEditMode() {
    $panels.editMode = !$panels.editMode;
  }

  function setCurrentId(id) {
    $panels.currentId = id;
  }

  function addPanel() {
    const id = uuid();
    const name = `Power n°${$panels.panels.length + 1}`;
    $panels.panels = [...$panels.panels, { id, name }];
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

  function addGridItem() {
    console.log("addGridItem");
  }

  function adjustGrid() {
    console.log("adjustGrid");
  }
</script>


{#if $panels}

<div class="flex items-center">
  <div class="inline-flex p-2">
    <Button first on:click={addPanel}>
      <span class="w-6 h-6"><MdAdd /></span>
    </Button>
    <Button last on:click={toggleEditMode} disabled={!$panels.panels.length} bg={$panels.editMode ? "danger" : "secondary"}>
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
    <Button on:click={adjustGrid}>
      <span class="w-6 h-6"><MdApps /></span>
      <span class="hidden md:inline md:ml-2">Adjust grid</span>
    </Button>
  </div>
  <div class="p-1">
    <Button on:click={addGridItem}>
      <span class="w-6 h-6"><MdAddToPhotos /></span>
      <span class="hidden md:inline md:ml-2">Add item</span>
    </Button>
  </div>
  <div class="p-1">
    ...
  </div>
  <div class="p-1">
    <Button bg="danger" text="light" on:click={removePanel.bind(null, $panels.currentId)}>
      <span class="w-6 h-6"><MdDelete /></span>
      <span class="hidden md:inline md:ml-2">Remove panel</span>
    </Button>
  </div>
</div>
{/if}

<div>
  {$panels.currentId}
</div>

{/if}
