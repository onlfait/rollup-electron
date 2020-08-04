<script>
  import { v4 as uuid } from "uuid";

  import Button from "../../Button.svelte";
  import PanelButton from "./PanelButton.svelte";
  import HOverflow from "../../HOverflow.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";

  import { panels, currentId, editMode } from "../../../stores/panels";

  let hOverflow = null;

  function addPanel() {
    const name = `Power n°${$panels.length + 1}`;
    const newPanel = { id: uuid(), name };
    $panels = [...$panels, newPanel];
    currentId.set(newPanel.id);
    hOverflow.scrollRight();
    remote.savePanels($panels);
    remote.setCurrentPanelId(newPanel.id);
  }

  function toggleEditMode() {
    $editMode = !$editMode;
  }
</script>

<div class="flex items-center">

  <div class="inline-flex p-2">
    <Button on:click={addPanel} first>
      <span class="w-6 h-6"><MdAdd /></span>
    </Button>
    <Button on:click={toggleEditMode} last bg={$editMode ? "danger" : "secondary"}>
      <span class="w-6 h-6"><MdSettings /></span>
    </Button>
  </div>

  {#if !$panels.length}
  <div class="p-2">
    No panel found o_O ! Click on the cross to add your first group of powers !
  </div>
  {/if}

  <HOverflow bind:this={hOverflow} gap="2">
    {#each $panels as panel}
  	<PanelButton {panel} />
    {/each}
  </HOverflow>

</div>
