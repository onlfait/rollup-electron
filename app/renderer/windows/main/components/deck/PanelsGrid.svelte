<script>
  import Grid from "svelte-grid";
  import Modal from "../Modal.svelte";
  import { _ } from "../../../../i18n";
  import GridItem from "./GridItem.svelte";
  import EditWidget from "./EditWidget.svelte";
  import { gridOptions } from "../../utils/deck";
  import { panels, currentId, editMode } from "../../stores/deck";

  let panel = null;
  let editWidget = null;
  let currentWidget = null;
  let confirmRemoveModal = false;

  function getPanelById(id) {
    return $panels.find(panel => panel.id === id);
  }

  function getCurrentPanel() {
    return getPanelById($currentId);
  }

  function removeWidgetFromPanel(panel, widget) {
    panel.widgets = panel.widgets.filter(w => {
      return w.id !== widget.id;
    });
  }

  function removeWidget(widget) {
    $panels = $panels.map((panel, i) => {
      if (panel.id === $currentId) {
        removeWidgetFromPanel(panel, widget);
      }
      return panel;
    });
  }

  function removeCurrentWidget() {
    removeWidget(currentWidget);
    closeConfirmRemoveModal();
  }

  function askRemoveWidget(widget) {
    currentWidget = widget;
    confirmRemoveModal = true;
  }

  function closeConfirmRemoveModal() {
    confirmRemoveModal = false;
  }

  function setEditWidget(widget) {
    editWidget = $editMode && widget;
  }

  function closeEditWidget() {
    editWidget = null;
  }

  function updatePanel(panel) {
    $panels = $panels.map((p, i) => {
      if (p.id === panel.id) {
        return { ...p, ...panel };
      }
      return p;
    });
  }

  function updateWidget(newWidget) {
    panel.widgets = panel.widgets.map(widget => {
      if (widget.id === newWidget.id) {
        return { ...widget, ...newWidget };
      }
      return widget;
    })
  }

  $: if ($panels) {
    panel = getCurrentPanel();
  }

  $: if (editWidget) {
    updateWidget(editWidget);
    updatePanel(panel);
  }
</script>

{#if panel}

  {#if !panel.widgets.length}
  <div class="p-2">
    {_('sentences.noWidgetsFound')}
  </div>
  {:else}
  <div class="flex-auto overflow-auto p-1">
    <Grid bind:items={panel.widgets} let:item {...gridOptions}>
      <GridItem {item} editMode={$editMode}
        on:edit={setEditWidget.bind(null, item)}
        on:remove={askRemoveWidget.bind(null, item)}
      />
    </Grid>
  </div>
  {/if}

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
    <EditWidget bind:widget={editWidget} />
  </div>
</Modal>
{/if}
