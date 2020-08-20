<script>
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
    console.log("addPanel");
    const id = uuid();
    const name = `Powers group n°${$panels.length + 1}`;
    $panels = [...$panels, { id, name, widgets: [] }];
    setCurrentId(id);
    overflowElement.scrollRight();
  }

  function toggleEditMode() {
    $editMode = !$editMode;
  }

  $: toggleButtonBg = $editMode ? "text-red-500" : "text-gray-200";
</script>

<div class="bg-purple-800 flex items-center">

  <div class="inline-flex p-2">
    <button on:click={addPanel}>
      <div class="w-6 h-6"><MdAdd /></div>
    </button>
    <button on:click={toggleEditMode} disabled={!$panels.length} class={toggleButtonBg}>
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
      class="p-2 rounded {$currentId === panel.id ? "bg-gray-600" : "bg-gray-400"}"
      on:click={setCurrentId.bind(null, panel.id)}
    >
      {panel.name}
    </button>
    {/each}
  </HOverflow>

  {/if}

</div>
