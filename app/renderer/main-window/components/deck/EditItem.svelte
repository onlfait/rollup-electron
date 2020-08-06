<script>
  import FileInput from "../FileInput.svelte";
  import ColorPicker from "../ColorPicker.svelte";

  export let item = null;

  $: icon = item && item.icon && item.icon.name;
  $: color = item && item.color;

  async function onImage(event) {
    let { name, path } = event.detail;
    name = await remote.addGridIcon({ name, path });
    item = { ...item, icon: { name, path } };
  }

  function onColor(event) {
    item = { ...item, color: event.detail.hex };
  }
</script>

<div class="flex flex-col mx-2 space-y-2">

  <div class="flex flex-col">
    <div class="font-medium">Background image</div>
    <div class="flex">
      <FileInput accept="image/*" on:file="{onImage}" />
      {#if icon}
      <img src="/public/grid-icons/{icon}" class="ml-2 h-6" alt="{icon}">
      {:else}
      <span class="ml-1 italic">No image selected</span>
      {/if}
    </div>
  </div>

  <div class="flex flex-col">
    <div class="font-medium">Background color</div>
    <div class="flex">
      <ColorPicker on:color="{onColor}" />
      <div class="ml-2 w-6 h-6" style="background-color: {color}"></div>
    </div>
  </div>

</div>
