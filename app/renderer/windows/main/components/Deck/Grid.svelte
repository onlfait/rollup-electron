<script>
  import { _ } from "@/renderer/i18n";

  import {
    panels,
    editMode,
    currentGrid,
    currentPanelId
  } from "../../stores/deck";

  import Grid from "svelte-grid";
  import Modal from "../Modal.svelte";
  import Button from "../Button.svelte";
  import { grid } from "../../utils/deck";
  import GridWidget from "./Grid/Widget.svelte";
  import EditWidget from "./Grid/EditWidget.svelte";

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
    <div class="h-full">
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
  <div class="font-bold p-2">
    {_('sentences.askForWidgetDeletion', { name: currentWidget.id })}
  </div>
  <div class="flex p-2 space-x-2">
    <Button class="bg-primary" on:click={removeCurrentWidget}>
      {_('words.yes')}
    </Button>
    <Button class="bg-secondary" on:click={closeConfirmRemoveModal}>
      {_('words.no')}
    </Button>
  </div>
</Modal>
{/if}

{#if editWidget}
<Modal closeCross on:click={closeEditWidget}>
  <EditWidget bind:widget={editWidget} on:change={onWidgetChange} />
</Modal>
{/if}
