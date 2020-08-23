<script>
  import { onMount } from "svelte";
  import { v4 as uuid } from "uuid";
  import { _ } from "@/renderer/i18n";

  import { panels, currentPanelId, editMode } from "../../stores/deck";
  import { grid, panels as panelsOptions } from "../../utils/deck";
  import gridHelp from "svelte-grid/src/utils/helper";

  import Grid from "svelte-grid";

  import Modal from "../Modal.svelte";
  import HOverflow from "../HOverflow.svelte";
  import InputText from "../InputText.svelte";
  import EditWidget from "./EditWidget.svelte";
  import GridWidget from "./GridWidget.svelte";

  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";

  import MdApps from "svelte-icons/md/MdApps.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";

  let panelName = null;
  let editWidget = null;
  let currentGrid = null;
  let currentWidget = null;
  let overflowElement = null;
  let confirmRemoveModal = false;
  let confirmRemoveWidgetModal = false;

  function askRemoveCurrentPanel() {
    confirmRemoveModal = true;
  }

  function closeConfirmRemoveModal() {
    confirmRemoveModal = false;
  }

  function removeCurrentPanel() {
    removePanelById($currentPanelId);
    closeConfirmRemoveModal();
  }

  function removePanelById(id) {
    let pos = -1;

    $panels = $panels.filter((panel, i) => {
      if (panel.id === id) {
        pos = i;
        return false;
      }
      return true;
    });

    if (!$panels.length) {
      $editMode = false;
      currentGrid = null;
      $currentPanelId = null;
    } else if (pos > -1 && $currentPanelId === id) {
      $currentPanelId = ($panels[pos] || $panels[pos-1]).id;
    }
  }

  function fixPanelEditMode() {
    currentGrid = currentGrid && currentGrid.map(widget => {
      return { ...widget, ...editableItem() };
    });
  }

  function setCurrentId(id) {
    $currentPanelId = id;
  }

  function toggleEditMode() {
    $editMode = !$editMode;
    fixPanelEditMode();
  }

  function updatePanel(panel) {
    $panels = $panels.map(p => (p.id === panel.id) ? { ...p, ...panel } : p);
  }

  function createPanel() {
    const id = uuid();
    const name = `${_('sentences.powersGroup')} n°${$panels.length + 1}`;
    return { ...panelsOptions.defaultPanel, id, name };
  }

  function addPanel() {
    const panel = createPanel();
    $panels = [ ...$panels, panel ];
    setCurrentId(panel.id);
    overflowElement && overflowElement.scrollRight();
  }

  function getPanelById(id) {
    return $panels.find(panel => panel.id === id);
  }

  function editableItem() {
    return {
      static: !$editMode,
      resizable: $editMode,
      draggable: $editMode
    };
  }

  function createGridWidget() {
    return { id: uuid(), ...grid.defaultWidget, ...editableItem() };
  }

  function addGridWidget() {
    const { cols } = grid.defaultOptions;
    const newItem = gridHelp.item(createGridWidget());
    const oldItems = gridHelp.findSpaceForItem(newItem, currentGrid, cols);
    currentGrid = [...currentGrid, ...[{ ...newItem, ...oldItems }]];
    updatePanel({ id: $currentPanelId, widgets: currentGrid });
  }

  onMount(fixPanelEditMode);

  function adjustGrid() {
    const { cols } = grid.defaultOptions;
    currentGrid = gridHelp.resizeItems(currentGrid, cols);
    updatePanel({ id: $currentPanelId, widgets: currentGrid });
  }

  $: toggleButtonBg = $editMode ? "text-red-500" : "text-gray-200";

  $: if ($currentPanelId) {
    const panel = getPanelById($currentPanelId);
    panelName = panel.name;
    currentGrid = panel.widgets;
    fixPanelEditMode();
  }

  $: if (panelName && $editMode) {
    if (getPanelById($currentPanelId).name !== panelName) {
      updatePanel({ id: $currentPanelId, name: panelName });
    }
  }

  function onGridAdjust() {
    updatePanel({ id: $currentPanelId, widgets: currentGrid });
  }

  function setEditWidget(widget) {
    editWidget = $editMode && widget;
  }

  function removeWidget(widget) {
    currentGrid = currentGrid.filter(w => w.id !== widget.id);
    updatePanel({ id: $currentPanelId, widgets: currentGrid });
  }

  function removeCurrentWidget() {
    removeWidget(currentWidget);
    confirmRemoveWidgetModal = false;
    currentWidget = null;
  }

  function askRemoveWidget(widget) {
    currentWidget = widget;
    confirmRemoveWidgetModal = true;
  }

  function onWidgetChange() {
    currentGrid = currentGrid.map(w => {
      if (w.id === editWidget.id) {
        return { ...w, ...editWidget };
      }
      return w
    });
    updatePanel({ id: $currentPanelId, widgets: currentGrid });
  }

  function closeEditWidget() {
    editWidget = null;
  }
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
      class="p-2 flex-shrink-0 rounded {$currentPanelId === panel.id ? "bg-gray-600" : "bg-gray-400"}"
      on:click={setCurrentId.bind(null, panel.id)}
    >
      {panel.name}
    </button>
    {/each}
  </HOverflow>

  {/if}

</div>

<!-- Settings -->

{#if $editMode}

<div class="bg-gray-600 flex flex-wrap p-2 space-x-2">
  <div>
    <button class="p-2 flex" on:click={adjustGrid}>
      <span class="inline-block w-6 h-6"><MdApps /></span>
      <span class="hidden md:inline md:ml-2">{_('sentences.adjustGrid')}</span>
    </button>
  </div>
  <div>
    <button class="p-2 flex" on:click={addGridWidget}>
      <span class="inline-block w-6 h-6"><MdAddToPhotos /></span>
      <span class="hidden md:inline md:ml-2">{_('sentences.addGridWidget')}</span>
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
    <button class="p-2 flex bg-red-500 rounded" on:click={askRemoveCurrentPanel}>
      <div class="w-6 h-6"><MdDelete /></div>
      <div class="hidden md:inline md:ml-2">Remove panel</div>
    </button>
  </div>
</div>

{/if}

{#if confirmRemoveModal}
<Modal>
  <div class="bg-gray-200 text-gray-800 rounded flex flex-col p-2">
    <div class="font-bold p-2">
      {_('sentences.askForPanelDeletion', { name: panelName })}
    </div>
    <div class="flex p-2 space-x-2">
      <button class="uppercase bg-purple-500 p-2 rounded" on:click={removeCurrentPanel}>
        {_('words.yes')}
      </button>
      <button class="uppercase bg-gray-500 p-2 rounded" on:click={closeConfirmRemoveModal}>
        {_('words.no')}
      </button>
    </div>
  </div>
</Modal>
{/if}

<!-- Grid -->

{#if !currentGrid || !currentGrid.length}
<div class="p-2">
  {_('sentences.noWidgetsFound')}
</div>
{:else}
<div class="flex-auto overflow-auto p-1">
  <Grid bind:items={currentGrid} on:adjust={onGridAdjust} let:item {...grid.defaultOptions}>
    <div class="bg-red-500 h-full">
      <GridWidget
        widget={item}
        editMode={$editMode}
        on:edit={setEditWidget.bind(null, item)}
        on:remove={askRemoveWidget.bind(null, item)}
      />
    </div>
  </Grid>
</div>
{/if}

{#if confirmRemoveWidgetModal}
<Modal>
  <div class="bg-gray-200 text-gray-800 rounded flex flex-col p-2">
    <div class="font-bold p-2">
      {_('sentences.askForWidgetDeletion', { name: currentWidget.id })}
    </div>
    <div class="flex p-2 space-x-2">
      <button class="uppercase bg-purple-500 p-2 rounded" on:click={removeCurrentWidget}>
        {_('words.yes')}
      </button>
      <button class="uppercase bg-gray-500 p-2 rounded" on:click={closeConfirmRemoveModal}>
        {_('words.no')}
      </button>
    </div>
  </div>
</Modal>
{/if}

{#if editWidget}
<Modal on:click={closeEditWidget}>
  <div class="p-10 bg-gray-200 text-gray-800 rounded overflow-auto shadow">
    <EditWidget bind:widget={editWidget} on:change={onWidgetChange} />
  </div>
</Modal>
{/if}
