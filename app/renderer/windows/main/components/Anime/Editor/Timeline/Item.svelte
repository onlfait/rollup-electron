<script>
  import { getContext } from "svelte";
  import Icon from "../../../Icon.svelte";
  import AnimeIcon from "../AnimeIcon.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let item;
  export let pos;

  const { items, selectedItem } = getContext("Editor");

  let isDragOver = false;

  $: selected = $selectedItem === item ? "bg-blue-600 bg-opacity-25" : "bg-primary-darker";

  function onSelect() {
    if ($selectedItem !== item) {
      $selectedItem = item;
    }
  }

  function onDelete(event) {
    event.stopPropagation();
    if ($selectedItem === item) {
      $selectedItem = null;
    }
    $items = $items.filter(({ id }) => id !== item.id);
  }

  function onDragStart({ dataTransfer }) {
    dataTransfer.setData("from", pos);
  }

  function onDragOver() {
    isDragOver = true;
  }

  function onDragLeave() {
    isDragOver = false;
  }

  function moveItem({ from, to }) {
    if (from === to) return;
    $items.splice(to, 0, $items.splice(from, 1)[0]);
    $items = $items;
  }

  function onDrop({ dataTransfer }) {
    moveItem({ from: parseInt(dataTransfer.getData("from")), to: pos });
    isDragOver = false;
  }
</script>

<div
  draggable={true}
  on:click={onSelect}
  on:dragstart={onDragStart}
  on:dragover={onDragOver}
  on:dragleave={onDragLeave}
  on:drop={onDrop}
  class="relative flex pl-2 items-center space-x-2 {selected}"
>
  <AnimeIcon type={item.target.type} />
  <div class="p-2 pl-0 truncate flex-1">{item.target.name}</div>
  <div class="p-2 cursor-pointer hover:bg-red-600" on:click={onDelete}>
    <Icon icon={MdDeleteForever} />
  </div>
  {#if isDragOver}
  <div class="absolute bg-red-600 inset-0" style="height:2px;top:auto;"></div>
  {/if}
</div>

<div class="flex pl-2 items-center space-x-2 bg-primary-darker"></div>
