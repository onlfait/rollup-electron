<script>
  import { v4 as uuid } from "uuid";
  import cloneDeep from "clone-deep";
  import { _ } from "@/renderer/i18n";

  import {
    panels,
    editMode,
    currentGrid,
    currentPanelId
  } from "../../../stores/deck";

  import { grid } from "../../../utils/deck";
  import gridHelp from "svelte-grid/src/utils/helper";

  import Modal from "../../Modal.svelte";
  import Button from "../../Button.svelte";
  import InputText from "../../InputText.svelte";
  import MdApps from "svelte-icons/md/MdApps.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";

  let panelName = '';
  let confirmRemoveModal = false;

  function toggleEditMode() {
    $editMode = !$editMode;
  }

  function openConfirmRemoveModal() {
    confirmRemoveModal = true;
  }

  function closeConfirmRemoveModal() {
    confirmRemoveModal = false;
  }

  function removeCurrentPanel() {
    removePanelById($currentPanelId);
    closeConfirmRemoveModal();
  }

  function getPanelById(id) {
    return $panels.find(panel => panel.id === id);
  }

  function getCurrentPanel() {
    return getPanelById($currentPanelId);
  }

  function updatePanel(panel) {
    $panels = $panels.map(p => (p.id === panel.id) ? { ...p, ...panel } : p);
  }

  function updateCurrentPanel(panel) {
    updatePanel({ ...panel, id: $currentPanelId });
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
      $currentGrid = null;
      $currentPanelId = null;
    } else if (pos > -1 && $currentPanelId === id) {
      $currentPanelId = ($panels[pos] || $panels[pos-1]).id;
    }
  }

  function editableItem() {
    return {
      static: !$editMode,
      resizable: $editMode,
      draggable: $editMode
    };
  }

  function createGridWidget() {
    return { id: uuid(), ...cloneDeep(grid.defaultWidget), ...editableItem() };
  }

  function addGridWidget() {
    const { cols } = cloneDeep(grid.defaultOptions);
    const newItem = gridHelp.item(createGridWidget());
    const oldItems = gridHelp.findSpaceForItem(newItem, $currentGrid, cols);
    $currentGrid = [...$currentGrid, ...[{ ...newItem, ...oldItems }]];
    updateCurrentPanel({ widgets: $currentGrid });
  }

  function adjustGrid() {
    const { cols } = cloneDeep(grid.defaultOptions);
    $currentGrid = gridHelp.resizeItems($currentGrid, cols);
    updateCurrentPanel({ widgets: $currentGrid });
  }

  function updateCurrentGrid() {
    const panel = getCurrentPanel();
    if (panel) {
      $currentGrid = panel.widgets;
      panelName = panel.name;
    } else {
      $currentGrid = null;
      panelName = null;
    }
  }

  $: if ($currentPanelId) {
    updateCurrentGrid();
  }

  $: if (panelName && $editMode) {
    if (getCurrentPanel().name !== panelName) {
      updatePanel({ id: $currentPanelId, name: panelName });
    }
  }

  function fixPanelEditMode(panel) {
    panel.widgets = panel.widgets.map(widget => {
      return { ...widget, ...editableItem() };
    });
    return panel;
  }

  function fixPanelsEditMode() {
    $panels = $panels.map(fixPanelEditMode);
    updateCurrentGrid();
  }

  editMode.subscribe(fixPanelsEditMode);
</script>


{#if $editMode}
<div class="p-2 flex items-center bg-secondary-dark text-light space-x-2">

  <Button icon={MdApps} on:click={adjustGrid}>
    <span class="hidden md:inline md:ml-2">{_('sentences.adjustGrid')}</span>
  </Button>

  <Button icon={MdAddToPhotos} on:click={addGridWidget}>
    <span class="hidden md:inline md:ml-2">{_('sentences.addGridWidget')}</span>
  </Button>

  <InputText
    label="Rename"
    bind:value={panelName}
    on:enterKey={toggleEditMode}
  />

  <Button icon={MdDelete} class="bg-red-500" on:click={openConfirmRemoveModal}>
    <div class="hidden lg:inline">Remove panel</div>
  </Button>

</div>
{/if}

{#if confirmRemoveModal}
<Modal>
  <div class="font-bold p-2">
    {_('sentences.askForPanelDeletion', { name: panelName })}
  </div>
  <div class="flex p-2 space-x-2">
    <Button class="bg-primary" on:click={removeCurrentPanel}>
      {_('words.yes')}
    </Button>
    <Button class="bg-secondary" on:click={closeConfirmRemoveModal}>
      {_('words.no')}
    </Button>
  </div>
</Modal>
{/if}
