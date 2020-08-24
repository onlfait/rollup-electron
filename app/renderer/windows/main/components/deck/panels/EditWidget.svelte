<script>
  import FileInput from "../../FileInput.svelte";
  import InputText from "../../InputText.svelte";
  import ColorPicker from "../../ColorPicker.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  import { widgetsList } from "../../../utils/deck";
  import { createEventDispatcher } from "svelte";

  export let widget = null;

  const dispatch = createEventDispatcher();

  function updateProps(props) {
    widget.props = { ...widget.props, ...props };
  }

  function onComponentChange() {
    updateProps({ component });
  }

  function onBackgroundColor({ detail }) {
    updateProps({ backgroundColor: detail.hex });
  }

  async function onBackgroundImage({ detail }) {
    if (!detail) return;
    const backgroundImage = await app.remote.call('upload.image', detail.path);
    updateProps({ backgroundImage });
  }

  function removeBackgroundImage() {
    updateProps({ backgroundImage: null });
  }

  $: props = widget.props;
  $: component = props.component;
  $: label = props.label || (component && component.label);

  $: dispatch('change', widget);
</script>

<div class="flex flex-col bg-gray-200 mx-2 space-y-2">

  <div class="flex flex-col">
    <div class="font-medium">Select component</div>
    <div class="flex items-center">
      <select class="p-2 rounded" bind:value={component} on:change={onComponentChange}>
      <option value="null">None</option>
      {#each widgetsList as item}
        <option value={item} selected={component && component.name === item.name}>
          {item.label}
        </option>
      {/each}
      </select>
    </div>
  </div>

  <div class="flex flex-col bg-gray-400 p-2 space-y-2 rounded">

    <div class="flex flex-col">
      <div class="text-lg font-medium text-gray-700">Button settings</div>
    </div>

    <div class="flex flex-col">
      <div class="font-medium">Background image</div>
      <div class="flex items-center space-x-2">
        <FileInput label="Upload image" accept="image/*" on:file="{onBackgroundImage}" />
        <button class="p-2 bg-purple-600 rounded">Select image</button>
        {#if props.backgroundImage}
        <img class="h-10" src="/public/media/images/{props.backgroundImage}" alt={props.backgroundImage}>
        <span on:click={removeBackgroundImage} class="ml-2 w-8 h-8 text-gray-500 hover:text-danger-dark"><MdDelete /></span>
        {:else}
        <span class="ml-1 italic">No image selected</span>
        {/if}
      </div>
    </div>

    <div class="flex flex-col">
      <div class="font-medium">Background color</div>
      <div class="flex items-center">
        <ColorPicker
          startColor={props.backgroundColor}
          disableAlpha={true}
          on:color={onBackgroundColor}
        />
        <div class="ml-2 w-10 h-10" style="background-color: {props.backgroundColor}"></div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="font-medium">Class list</div>
      <div class="flex items-center">
        <InputText bind:value={props.classList} />
      </div>
    </div>

  </div>

</div>
