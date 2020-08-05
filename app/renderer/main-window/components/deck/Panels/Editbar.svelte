<script>
  import Button from "../../Button.svelte";
  import InputText from "../../InputText.svelte";
  import MdApps from "svelte-icons/md/MdApps.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";

  import { panels, editMode, currentId } from "../../../stores/panels";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let panel = null;

  $: panel = findPanel($currentId);

  function toggleEditMode() {
    $editMode = !$editMode;
  }

  function findPanel(id) {
    return $panels.find(p => p.id === id);
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

  function updatePanel(panel) {
    $panels = $panels.map(p => {
      if (p.id === panel.id) {
        return { ...p, ...panel };
      }
      return p;
    });
  }

  function adjustGrid() {
    dispatch("adjustGrid");
  }

  function addGridItem() {
    dispatch("addGridItem");
  }
</script>

{#if panel && $editMode}
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
    <InputText
      bind:value={panel.name}
      on:enterKey={toggleEditMode}
      on:input={updatePanel.bind(null, panel)}
    >Rename</InputText>
  </div>
  <div class="p-1">
    <Button bg="danger" text="light" on:click={removePanel.bind(null, $currentId)}>
      <span class="w-6 h-6"><MdDelete /></span>
      <span class="hidden md:inline md:ml-2">Remove panel</span>
    </Button>
  </div>
</div>
{/if}
