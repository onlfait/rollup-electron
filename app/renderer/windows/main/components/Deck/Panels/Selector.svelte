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

  import Button from "../../Button.svelte";
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
    return id === panel.id ? 'bg-green-600' : 'bg-primary-light';
  }
</script>

<div class="p-2 flex space-x-2 items-center bg-primary-lighter text-light">

  <Button icon={MdAdd} on:click={addPanel} class="bg-primary" />

{#if $panels.length}
  <Button
    icon={MdSettings}
    class="bg-primary"
    on:click={toggleEditMode}
    disabled={!$panels.length}
    textColor={$editMode && 'text-red-600'}
  />
{/if}

{#if !$panels.length}
  <div class="p-2">
    {_('sentences.noPanelsFound')}
  </div>
{:else}
  <HOverflow bind:this={scoller} gap="2">
    {#each $panels as panel}
    <Button
      class="flex-shrink-0 {isActiveClass($currentPanelId, panel)}"
      on:click={setCurrentPanelId.bind(null, panel.id)}
    >
      {panel.name}
    </Button>
    {/each}
  </HOverflow>
{/if}

</div>
