<script>
  import Button from "../Button.svelte";
  import FileInput from "../FileInput.svelte";
  import ColorPicker from "../ColorPicker.svelte";

  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  export let item = null;

  $: icon = item && item.icon && item.icon.name;
  $: color = item && item.color;

  async function onImage({ detail }) {
    if (!detail) return;
    let { name, path } = detail;
    name = await remote.addGridIcon({ name, path });
    item = { ...item, icon: { name, path } };
  }

  function removeIcon() {
    item = { ...item, icon: null };
  }

  function onColor({ detail }) {
    item = { ...item, color: detail.hex };
  }
</script>

<div class="flex flex-col mx-2 space-y-2">

  <div class="flex flex-col">
    <div class="font-medium">Background image</div>
    <div class="flex items-center">
      <FileInput label="Upload image" accept="image/*" on:file="{onImage}" />
      <Button text="light" mx="2">Select image</Button>
      {#if icon}
      <img src="/public/grid-icons/{icon}" class="h-10" alt="{icon}">
      <span on:click={removeIcon} class="ml-2 w-8 h-8 text-gray-500 hover:text-danger-dark"><MdDelete /></span>
      {:else}
      <span class="ml-1 italic">No image selected</span>
      {/if}
    </div>
  </div>

  <div class="flex flex-col">
    <div class="font-medium">Background color</div>
    <div class="flex items-center">
      <ColorPicker startColor={color} disableAlpha={true} on:color={onColor} />
      <div class="ml-2 w-10 h-10" style="background-color: {color}"></div>
    </div>
  </div>

</div>
