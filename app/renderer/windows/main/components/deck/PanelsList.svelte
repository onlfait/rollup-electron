<script>
  import { onMount } from "svelte";
  import { v4 as uuid } from "uuid";
  import { _ } from "../../../../i18n"
  import { panels, editMode, currentId } from "../../stores/deck";

  import HOverflow from "../HOverflow.svelte";

  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";

  let overflowElement = null;

  function setCurrentId(id) {
    $currentId = id;
  }

  function addPanel() {
    const id = uuid();
    const name = `Powers group n°${$panels.length + 1}`;
    $panels = [...$panels, { id, name, widgets: [] }];
    setCurrentId(id);
    overflowElement && overflowElement.scrollRight();
  }

  function editableItem() {
    return {
      static: !$editMode,
      resizable: $editMode,
      draggable: $editMode
    };
  }

  function fixPanelEditMode() {
    console.log("pouet");
    $panels = $panels.map(panel => {
      panel.widgets = panel.widgets.map(widget => {
        return { ...widget, ...editableItem() };
      });
      return panel;
    });
  }

  function toggleEditMode() {
    $editMode = !$editMode;
    fixPanelEditMode();
  }

  onMount(fixPanelEditMode);

  $: toggleButtonBg = $editMode ? "text-red-500" : "text-gray-200";
</script>

<div class="bg-purple-800 flex items-center">

  <div class="inline-flex p-2 space-x-2">
    <button
      on:click={addPanel}
      class="p-2 bg-purple-500 rounded"
    >
      <div class="w-6 h-6"><MdAdd /></div>
    </button>
    <button
      on:click={toggleEditMode}
      disabled={!$panels.length}
      class="p-2 bg-purple-500 rounded {toggleButtonBg}"
    >
      <div class="w-6 h-6"><MdSettings /></div>
    </button>
  </div>

  {#if !$panels.length}
  <div class="p-2">
    {_('sentences.noPanelsFound')}
  </div>
  {:else}

  <HOverflow bind:this={overflowElement} gap="2">
    {#each $panels as panel}
    <button
      class="p-2 flex-shrink-0 rounded {$currentId === panel.id ? "bg-gray-600" : "bg-gray-400"}"
      on:click={setCurrentId.bind(null, panel.id)}
    >
      {panel.name}
    </button>
    {/each}
  </HOverflow>

  {/if}

</div>
