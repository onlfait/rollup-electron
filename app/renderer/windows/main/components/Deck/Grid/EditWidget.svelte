<script>
  import Button from "../../Button.svelte";
  import Select from "../../Select.svelte";
  import FileInput from "../../FileInput.svelte";
  import InputText from "../../InputText.svelte";
  import ColorPicker from "../../ColorPicker.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  import {
    get as getWidget,
    getList as getWidgetList
  } from "../../../widgets";
  import { createEventDispatcher } from "svelte";

  export let widget = null;

  const dispatch = createEventDispatcher();

  let widgetsList = [
    { label: "None", name: null },
    ...getWidgetList().map(widget => {
      return { ...widget, label: `${widget.group} — ${widget.label}`};
    })
  ];

  const labelPositions = [
    { label: "Left", value: "text-left" },
    { label: "Center", value: "text-center" },
    { label: "Right", value: "text-right" },
  ];

  function updateProps(props) {
    widget.props = { ...widget.props, ...props };
  }

  function onComponentChange({ detail }) {
    component = detail.name && detail;
    updateProps({ component });
  }

  function onBackgroundColor({ detail }) {
    updateProps({ backgroundColor: detail.hex });
  }

  async function onBackgroundImage({ detail }) {
    if (!detail) return;
    const backgroundImage = await app.remote.call("upload.image", detail.path);
    updateProps({ backgroundImage });
  }

  function removeBackgroundImage() {
    updateProps({ backgroundImage: null });
  }

  function onLabelChange({ target }) {
    updateProps({ label: target.value });
  }

  function onLabelSizeChange({ target }) {
    updateProps({ labelSize: target.value });
  }

  function onLabelPaddingChange({ target }) {
    updateProps({ labelPadding: target.value });
  }

  $: props = widget.props;
  $: component = props.component;
  $: widgetLabel = widget.props.label;
  $: componentName = component && component.name;
  $: componentLabel = component && component.label;
  $: componentProps = component && component.props;
  $: componentSettings = component && getWidget(component).Settings;

  $: dispatch("change", widget);
</script>

<div on:click|stopPropagation class="p-2 flex flex-col space-y-2">

  <div class="text-lg font-medium text-secondary-dark">
    Component settings
  </div>

  <div class="flex flex-col">
    <div class="font-medium">Select component</div>
    <div class="flex items-center">
      <Select
        class="p-2 rounded"
        items={widgetsList}
        valueKey="name"
        value={componentName}
        on:change={onComponentChange}
      />
    </div>
  </div>

  {#if componentSettings}
  <svelte:component bind:widget bind:props={componentProps} this={componentSettings} />
  {/if}

  <div class="flex flex-col bg-secondary p-2 space-y-2 rounded">

    <div class="text-lg font-medium text-secondary-dark">Button settings</div>

    <div class="flex flex-wrap space-x-2">
      <div class="flex flex-auto flex-col">
        <div class="font-medium">Label</div>
        <InputText
          value={widgetLabel}
          placeholder={componentLabel}
          on:input={onLabelChange}
        />
      </div>

      <div class="flex flex-col">
        <div class="font-medium">Size</div>
        <input
          type="number"
          min={2}
          bind:value={props.labelSize}
          on:input={onLabelSizeChange}
          class="p-2 flex-auto rounded w-16"
        />
      </div>

      <div class="flex flex-col">
        <div class="font-medium">Padding</div>
        <input
          type="number"
          min={0}
          bind:value={props.labelPadding}
          on:input={onLabelPaddingChange}
          class="p-2 flex-auto rounded w-16"
        />
      </div>

      <div class="flex flex-col">
        <div class="font-medium">Position</div>
        <Select
          class="p-2 rounded"
          items={labelPositions}
          bind:value={props.labelPosition}
        />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="font-medium">Background image</div>
      <div class="flex flex-wrap items-center space-x-2">
        <Button class="bg-primary-lighter">Select image</Button>
        <FileInput class="bg-primary-light" label="Upload image" accept="image/*" on:file="{onBackgroundImage}" />
        {#if props.backgroundImage}
        <img class="h-10 rounded" src="/public/media/images/{props.backgroundImage}" alt={props.backgroundImage}>
        <Button icon={MdDelete} on:click={removeBackgroundImage} class="hover:bg-red-500" />
        {:else}
        <span class="ml-1 italic">No image selected</span>
        {/if}
      </div>
    </div>

    <div class="flex flex-col">
      <div class="font-medium">Background color</div>
      <div class="flex items-center space-x-2">
        <ColorPicker
          class="text-light"
          disableAlpha={true}
          on:color={onBackgroundColor}
          startColor={props.backgroundColor}
        />
        <div class="w-10 h-10 rounded" style="background-color: {props.backgroundColor}"></div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="font-medium">Class list</div>
      <InputText bind:value={props.classList} />
    </div>

  </div>

</div>
