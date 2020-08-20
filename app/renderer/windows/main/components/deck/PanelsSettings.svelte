<script>
  import { v4 as uuid } from "uuid"
  import { _ } from "../../../../i18n"
  import { panels, editMode, currentId } from "../../stores/deck";
  import gridOptions from "./gridOptions"

  import Modal from "../Modal.svelte";
  import InputText from "../InputText.svelte";

  import MdApps from "svelte-icons/md/MdApps.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";

  import gridHelp from "svelte-grid/src/utils/helper";

  let panelName = '';
  let panel = null;

  let confirmRemoveModal = false;

  const defaultItem =  {
    x: 0, y: 0,
    w: 2, h: 2,
    min: { w: 2, h: 2 },
    color: "#6d80a5",
    icon: null,
    label: null,
    widget: null,
  };

  $: if ($currentId) {
    panelName = getPanelById($currentId).name;
  }

  $: if (panelName) {
    setPanelById($currentId, { name: panelName })
  }

  function getPanelById(id) {
    return $panels.find(panel => panel.id === id);
  }

  function setPanelById(id, panel) {
    $panels = $panels.map(p => {
      if (p.id === id) {
        return { ...p, ...panel };
      }
      return p;
    })
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
      $editMode = false;
    } else if (pos > -1 && $currentId === id) {
      $currentId = ($panels[pos] || $panels[pos-1]).id;
    }
  }

  function askRemoveCurrentPanel() {
    confirmRemoveModal = true;
  }

  function closeConfirmRemoveModal() {
    confirmRemoveModal = false;
  }

  function removeCurrentPanel() {
    removePanel($currentId);
    closeConfirmRemoveModal();
  }

  function adjustGrid() {
    const { cols } = gridOptions;
    const panel = getPanelById($currentId);
    panel.widgets = gridHelp.resizeItems(panel.widgets, cols);
    setPanelById($currentId, panel);
  }

  function toggleEditMode() {
    $editMode = !$editMode;
  }

  function editableItem() {
    return {
      static: !$editMode,
      resizable: $editMode,
      draggable: $editMode
    };
  }

  function createItem() {
    return { id: uuid(), ...defaultItem, ...editableItem() };
  }

  function addGridItem() {
    const { cols } = gridOptions;
    const panel = getPanelById($currentId);
    const newItem = gridHelp.item(createItem());
    const oldItems = gridHelp.findSpaceForItem(newItem, panel.widgets, cols);
    panel.widgets = [...panel.widgets, ...[{ ...newItem, ...oldItems }]];
    setPanelById($currentId, panel);
  }
</script>

{#if $editMode}
<div class="bg-gray-600 flex flex-wrap p-2 space-x-2">
  <div>
    <button class="p-2 flex" on:click={adjustGrid}>
      <span class="inline-block w-6 h-6"><MdApps /></span>
      <span class="hidden md:inline md:ml-2">Adjust grid</span>
    </button>
  </div>
  <div>
    <button class="p-2 flex" on:click={addGridItem}>
      <span class="inline-block w-6 h-6"><MdAddToPhotos /></span>
      <span class="hidden md:inline md:ml-2">Add item</span>
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
