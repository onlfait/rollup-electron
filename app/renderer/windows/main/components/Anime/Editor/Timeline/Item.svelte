<script>
  import { getContext } from "svelte";
  import Icon from "../../../Icon.svelte";
  import AnimeIcon from "../AnimeIcon.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let item;

  const { items, selectedItem } = getContext("Editor");

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

  $: selected = $selectedItem === item ? "bg-black bg-opacity-25" : "";
</script>

<div class="flex pl-2 items-center space-x-2 {selected}" on:click={onSelect}>
  <AnimeIcon type={item.target.type} />
  <div class="p-2 pl-0 truncate flex-1">{item.target.name}</div>
  <div class="p-2 cursor-pointer hover:bg-red-600" on:click={onDelete}>
    <Icon icon={MdDeleteForever} />
  </div>
</div>

<div class="flex pl-2 items-center space-x-2"></div>
