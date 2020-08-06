<script>
  import FileInput from "../FileInput.svelte";
  import ColorPicker from "../ColorPicker.svelte";

  export let item = null;

  $: icon = item && item.icon && item.icon.name;
  $: color = item && item.color;

  async function onImage({ detail }) {
    if (!detail) return;
    let { name, path } = detail;
    name = await remote.addGridIcon({ name, path });
    item = { ...item, icon: { name, path } };
  }

  function onColor({ detail }) {
    item = { ...item, color: detail.hex };
  }
</script>

<div class="flex flex-col mx-2 space-y-2">

  <div class="flex flex-col">
    <div class="font-medium">Background image</div>
    <div class="flex items-center">
      <FileInput accept="image/*" on:file="{onImage}" />
      {#if icon}
      <img src="/public/grid-icons/{icon}" class="ml-2 h-10" alt="{icon}">
      {:else}
      <span class="ml-1 italic">No image selected</span>
      {/if}
    </div>
  </div>

  <div class="flex flex-col">
    <div class="font-medium">Background color</div>
    <div class="flex items-center">
      <ColorPicker options={{startColor:color}} on:color={onColor} />
      <div class="ml-2 w-10 h-10" style="background-color: {color}"></div>
    </div>
  </div>

</div>
