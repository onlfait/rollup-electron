<script>
  import { v4 as uuid } from "uuid";

  import Panel from "./Panel.svelte";
  import Button from "../Button.svelte";
  import HOverflow from "../HOverflow.svelte";
  import InputText from "../InputText.svelte";
  import PanelButton from "./PanelButton.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  import { panels, currentId } from "../../stores/panels";

  let editMode = false;

  function addPanel() {
    const name = `Power n°${$panels.length + 1}`;
    const newPanel = { id: uuid(), name, widgets: [] };
    $panels = [...$panels, newPanel];
    $currentId = newPanel.id;
  }

  function toggleEditMode() {
    editMode = !editMode;
  }

  function findPanel(id) {
    return $panels.find(p => p.id === id);
  }

  function updatePanel(panel) {
    $panels = $panels.map(p => {
      if (p.id === panel.id) {
        return { ...p, ...panel };
      }
      return p;
    });
  }

  function removePanel(id) {
    let pos = -1;

    $panels = $panels.filter((panel, i) => {
      if (panel.id === id) {
        remote.removeGrid(panel.id);
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

    editMode = false;
  }

  document.addEventListener("click", () => (editMode = false));

  $: currentPanel = $currentId && findPanel($currentId);
  $: currentPanel && updatePanel(currentPanel);
</script>

<!-- top bar -->
<div class="flex items-center">

  <!-- top buttons group -->
  <div class="inline-flex p-2">
    <Button on:click={addPanel} first>
      <span class="w-6 h-6"><MdAdd /></span>
    </Button>
    <Button on:click={toggleEditMode} last bg={editMode ? "danger" : "secondary"}>
      <span class="w-6 h-6"><MdSettings /></span>
    </Button>
  </div>

  {#if !$panels.length}
  <div class="p-2">
    No panel found o_O ! Click on the cross to add your first group of powers !
  </div>
  {/if}

  <!-- panels buttons bar -->
  <HOverflow gap="2">
    {#each $panels as panel}
  	<PanelButton {panel} />
    {/each}
  </HOverflow>

</div>

{#if editMode}
<div class="absolute z-10 bg-secondary flex flex-wrap shadow-md mx-2 mt-16" on:click|stopPropagation>
  <div class="p-2">
    <InputText bind:value={currentPanel.name} on:enterKey={toggleEditMode}>Rename</InputText>
  </div>
  <div class="p-2">
    <Button bg="danger" text="light" on:click={removePanel.bind(null, $currentId)}>
      <span class="w-6 h-6"><MdDelete /></span>
      Remove panel
    </Button>
  </div>
</div>
{/if}

{#if currentPanel}
<Panel panel={currentPanel} />
{/if}
