<script>
  import { v4 as uuid } from "uuid";
  import Button from "../Button.svelte";
  import HOverflow from "../HOverflow.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import { panels, currentId } from "../../stores/panels";

  let editMode = false;
  let editItem = null;

  $: currentPanel = $currentId && findPanel($currentId);

  function setCurrentPanel(id) {
    $currentId = id;
    remote.setCurrentPanelId(id);
  }

  function addPanel() {
    const name = `Power n°${$panels.length + 1}`;
    const newPanel = { id: uuid(), name, widgets: [] };
    $panels = [...$panels, newPanel];
    $currentId = newPanel.id;
  }

  function removePanel(id) {
    let pos = -1;

    $panels = $panels.filter((panel, i) => {
      if (panel.id === id) {
        pos = i;
        return false;
      }
      return true;
    });

    if (!$panels.length) {
      $currentId = null;
    } else if (pos > -1 && $currentId === id) {
      $currentId = ($panels[pos] || $panels[pos-1]).id;
    }
  }

  function findPanel(id) {
    return $panels.find(p => p.id === id);
  }

  function toggleEditMode() {
    editMode = !editMode;
  }

  function editPanel(panel) {
    if (!editMode) return;
    editItem = editItem ? null : panel;
  }

  function updatePanel(panel) {
    $panels = $panels.map(p => {
      if (p.id === panel.id) {
        return { ...p, ...panel };
      }
      return p;
    });
  }

  $: editItem && updatePanel(editItem);
</script>

<div class="flex items-center">
  <div class="flex p-2 space-x-1">
    <Button on:click={addPanel}>
      <span class="w-6 h-6">
        <MdAdd />
      </span>
    </Button>
    <Button on:click={toggleEditMode}>
      <span class="w-6 h-6">
        <MdSettings />
      </span>
    </Button>
  </div>
  {#if !$panels.length}
  <div class="p-2">
    No panel found o_O ! Click on the cross to add your first group of powers !
  </div>
  {/if}
  <HOverflow>
    {#each $panels as panel}
  	<div
      class="relative cursor-pointer"
      on:click={setCurrentPanel.bind(null, panel.id)}
      on:dblclick={editPanel.bind(null, panel)}
    >
      {#if editMode}
      <span
        class="absolute p-1 w-6 h-6 top-0 right-0 rounded-full bg-red-800"
        on:click|stopPropagation={removePanel.bind(null, panel.id)}
      ><MdDelete /></span>
      {/if}
      <div class="m-2 p-2 text-center bg-secondary rounded">
        {panel.name}
      </div>
    </div>
    {/each}
  </HOverflow>
</div>

{#if editMode && editItem}
<div class="p-2">
  Change name
  <input bind:value={editItem.name} class="text-dark">
</div>
{/if}

{#if currentPanel}
<div class="p-2">
  Current panel: #{currentPanel.name}
</div>
{/if}
