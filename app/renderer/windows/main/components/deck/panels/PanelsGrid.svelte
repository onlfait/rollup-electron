<script>
  import { _ } from "@/renderer/i18n";

  import {
    panels,
    editMode,
    currentGrid,
    currentPanelId
  } from "../../../stores/deck";

  import Modal from "../../Modal.svelte";

  import Grid from "svelte-grid";
  import { grid } from "../../../utils/deck";
  import GridWidget from "./GridWidget.svelte";
  import EditWidget from "./EditWidget.svelte";

  let editWidget = null;
  let currentWidget = null;
  let confirmRemoveModal = false;

  function openConfirmRemoveModal(widget) {
    currentWidget = widget;
    confirmRemoveModal = true;
  }

  function closeConfirmRemoveModal() {
    confirmRemoveModal = false;
  }

  function updatePanel(panel) {
    $panels = $panels.map(p => (p.id === panel.id) ? { ...p, ...panel } : p);
  }

  function updateCurrentPanel(panel) {
    updatePanel({ ...panel, id: $currentPanelId });
  }

  function onGridAdjust() {
    updateCurrentPanel({ widgets: $currentGrid });
  }

  function setEditWidget(widget) {
    editWidget = $editMode && widget;
  }

  function removeWidget(widget) {
    $currentGrid = $currentGrid.filter(w => w.id !== widget.id);
    updateCurrentPanel({ widgets: $currentGrid });
  }

  function removeCurrentWidget() {
    removeWidget(currentWidget);
    closeConfirmRemoveModal();
    currentWidget = null;
  }

  function onWidgetChange() {
    $currentGrid = $currentGrid.map(w => {
      return (w.id === editWidget.id) ? { ...w, ...editWidget } : w;
    });
    updateCurrentPanel({ widgets: $currentGrid });
  }

  function closeEditWidget() {
    editWidget = null;
  }
</script>

{#if !$currentGrid}
{:else if !$currentGrid.length}
<div class="p-2">
  {_('sentences.noWidgetsFound')}
</div>
{:else}
<div class="flex-auto overflow-auto p-1">
  <Grid bind:items={$currentGrid} on:adjust={onGridAdjust} let:item {...grid.defaultOptions}>
    <div class="bg-red-500 h-full">
      <GridWidget
        widget={item}
        editMode={$editMode}
        on:edit={setEditWidget.bind(null, item)}
        on:remove={openConfirmRemoveModal.bind(null, item)}
      />
    </div>
  </Grid>
</div>
{/if}

{#if confirmRemoveModal}
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
