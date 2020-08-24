<script>
  import FileInput from "../../FileInput.svelte";
  import ColorPicker from "../../ColorPicker.svelte";

  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  import { widgetsList } from "../../../utils/deck";

  import obsSettings from "../../OBS/widgets/settings";
  import actionsSettings from "../../actions/widgets/settings";

  import { createEventDispatcher } from "svelte";

  export let widget = null;

  const dispatch = createEventDispatcher();
  const componentSettings = { ...obsSettings, ...actionsSettings };

  function onColor({ detail }) {
    widget = { ...widget, color: detail.hex };
  }

  async function onIcon({ detail }) {
    if (!detail) return;
    let { name, path } = detail;
    name = await app.remote.call('upload.image', { name, path });
    widget = { ...widget, icon: { name, path } };
  }

  function removeIcon() {
    widget = { ...widget, icon: null };
  }

  function onTypeChange() {
    widget = { ...widget, component };
  }

  $: component = widget && widget.component;
  $: dispatch('change', widget);
</script>

<div class="flex flex-col bg-gray-200 mx-2 space-y-2">

  <div class="flex flex-col">
    <div class="font-medium">Component</div>
    <div class="flex items-center">
      <select bind:value={component} on:change={onTypeChange}>
      <option value="null">None</option>
      {#each widgetsList as item}
        <option value={item} selected={component && component.name === item.name}>
          {item.label}
        </option>
      {/each}
      </select>
    </div>
  </div>

  {#if component}
  <svelte:component this={componentSettings[component.name]} bind:widget />
  {/if}

  <div class="flex flex-col">
    <div class="font-medium">Background image</div>
    <div class="flex items-center space-x-2">
      <FileInput label="Upload image" accept="image/*" on:file="{onIcon}" />
      <button class="p-2 bg-purple-600 rounded">Select image</button>
      {#if widget.icon}
      <img src="/public/media/images/{widget.icon.name}" class="h-10" alt="{widget.icon.name}">
      <span on:click={removeIcon} class="ml-2 w-8 h-8 text-gray-500 hover:text-danger-dark"><MdDelete /></span>
      {:else}
      <span class="ml-1 italic">No image selected</span>
      {/if}
    </div>
  </div>

  <div class="flex flex-col">
    <div class="font-medium">Background color</div>
    <div class="flex items-center">
      <ColorPicker
        startColor={widget.color}
        disableAlpha={true}
        on:color={onColor}
      />
      <div class="ml-2 w-10 h-10" style="background-color: {widget.color}"></div>
    </div>
  </div>

</div>
