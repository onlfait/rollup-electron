<script>
  import { v4 as uuid } from "uuid";

  import Button from "../Button.svelte";
  import HOverflow from "../HOverflow.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";

  import { panels } from "../../stores/panels";

  let hOverflow = null;

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
    hOverflow.scrollRight();
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
  <HOverflow bind:this={hOverflow} gap="2">
    {#each $panels.panels as panel}
    <Button noShrink on:click={setCurrentId.bind(null, panel.id)} bg={$panels.currentId === panel.id ? "primary" : "secondary"}>
      {panel.name}
    </Button>
    {/each}
  </HOverflow>
</div>

<div>
  {$panels.currentId}
</div>

{/if}
