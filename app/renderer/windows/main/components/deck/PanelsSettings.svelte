<script>
  import { panels, editMode, currentId } from "../../stores/deck";

  import InputText from "../InputText.svelte";

  import MdApps from "svelte-icons/md/MdApps.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";

  let panelName = '';

  $: if ($currentId) {
    panelName = getPanelById($currentId).name;
  }

  $: if (panelName) {
    setPanelById($currentId, { name: panelName })
  }

  function getPanelById(id) {
    return $panels.find(panel => panel.id === $currentId);
  }

  function setPanelById(id, panel) {
    $panels = $panels.map(p => {
      if (p.id === id) {
        return { ...p, ...panel };
      }
      return p;
    })
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
      $editMode = false;
    } else if (pos > -1 && $currentId === id) {
      $currentId = ($panels[pos] || $panels[pos-1]).id;
    }
  }

  function removeCurrentPanel() {
    removePanel($currentId);
  }

  function adjustGrid() {
    console.log("adjustGrid");
  }

  function addGridItem() {
    console.log("addGridItem");
  }

  function toggleEditMode() {
    $editMode = !$editMode;
  }
</script>

{#if $editMode}
<div class="bg-secondary flex flex-wrap mx-2 p-1 space-x-2">
  <div>
    <button text="light" on:click={adjustGrid}>
      <span class="inline-block w-6 h-6"><MdApps /></span>
      <span class="hidden md:inline md:ml-2">Adjust grid</span>
    </button>
  </div>
  <div>
    <button text="light" on:click={addGridItem}>
      <span class="inline-block w-6 h-6"><MdAddToPhotos /></span>
      <span class="hidden md:inline md:ml-2">Add item</span>
    </button>
  </div>
  <div>
    <InputText
      bg="gray-400"
      bind:value={panelName}
      on:enterKey={toggleEditMode}
    >Rename</InputText>
  </div>
  <div>
    <button class="bg-red-500 rounded" on:click={removeCurrentPanel}>
      <div class="w-6 h-6"><MdDelete /></div>
      <span class="hidden md:inline md:ml-2">Remove panel</span>
    </button>
  </div>
</div>
{/if}
