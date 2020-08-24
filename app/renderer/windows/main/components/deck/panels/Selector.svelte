<script>
  import { v4 as uuid } from "uuid";
  import cloneDeep from "clone-deep";
  import { _ } from "@/renderer/i18n";

  import {
    panels,
    editMode,
    currentPanelId
  } from "../../../stores/deck";

  import { panels as panelsSettings } from "../../../utils/deck";

  import HOverflow from "../../HOverflow.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";

  let scoller = null;

  const { defaultPanel } = panelsSettings;

  function setCurrentPanelId(id) {
    $currentPanelId = id;
  }

  function createPanelName() {
    return `${_('sentences.powersGroup')} n°${$panels.length + 1}`;
  }

  function createPanel() {
    return { ...cloneDeep(defaultPanel), id: uuid(), name: createPanelName() };
  }

  function addPanel() {
    const panel = createPanel();
    setCurrentPanelId(panel.id);
    $panels = [ ...$panels, panel ];
    scoller && scoller.scrollRight();
  }

  function toggleEditMode() {
    $editMode = !$editMode;
  }

  function isActiveClass(id, panel) {
    return id === panel.id ? 'bg-gray-600' : 'bg-gray-400';
  }

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

  <HOverflow bind:this={scoller} gap="2">
    {#each $panels as panel}
    <button
      class="p-2 flex-shrink-0 rounded {isActiveClass($currentPanelId, panel)}"
      on:click={setCurrentPanelId.bind(null, panel.id)}
    >
      {panel.name}
    </button>
    {/each}
  </HOverflow>

  {/if}

</div>
