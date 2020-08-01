<script>
  import { items, editItem } from "../../stores/grid";
  import FileInput from "../FileInput.svelte";
  import Button from "../Button.svelte";

  function updateItem(item) {
    $items = $items.map(i => (i.id === item.id) ? { ...i, ...item } : i);
  }

  async function onImage(event) {
    let { name, path } = event.detail;
    name = await remote.addGridIcon({ name, path });
    $editItem = {...$editItem, icon: { name, path }};
    updateItem($editItem);
  }

  function close() {
    $editItem = null;
  }
</script>

<div class="p-2">
  <Button on:click={close}>⨞ Back</Button>
</div>

<div class="flex flex-col mx-2 space-y-2">
  <label class="flex flex-col">
    <div class="font-medium">Background image</div>
    <div class="flex">
      <FileInput accept="image/*" on:file="{onImage}" />
      {#if $editItem.icon}
      <img src="/public/grid-icons/{$editItem.icon.name}" class="ml-2 h-6">
      {:else}
      <span class="ml-1 italic">No image selected</span>
      {/if}
    </div>
  </label>

  <label class="flex flex-col">
    <div class="font-medium">Background color</div>
    <div class="flex">
      ...
    </div>
  </label>
</div>
