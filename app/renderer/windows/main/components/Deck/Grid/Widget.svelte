<script>
  import { createEventDispatcher } from "svelte";
  import components from "../../widgets/actions";

  export let widget = null;
  export let editMode = false;

  const dispatch = createEventDispatcher();

  console.log(widget);

  $: props = widget.props;
  $: component = props.component;
  $: componentGroup = component && components[component.module];
  $: labelClass = props.labelPosition || 'text-center';
  $: labelSize = `font-size: ${props.labelSize||16}px;`;
  $: labelPadding = `padding-left: ${props.labelPadding||8}px;padding-right: ${props.labelPadding||8}px;`;
  $: label = (props.label || (props.component && props.component.label) || '').trim();
  $: bgColor = `background-color: ${props.backgroundColor};`;
  $: bgImage = props.backgroundImage ? `background-image: url("/public/media/images/${props.backgroundImage}");` : "";
</script>

<div
  style="{bgColor} {bgImage}"
  on:dblclick={dispatch.bind(null, "edit")}
  class="flex h-full bg-center bg-no-repeat bg-cover overflow-auto {props.classList}"
>

  <div class="flex flex-col w-full">

    {#if label.length}
    <div
      style="{labelSize} {labelPadding} min-height:24px;"
      class="flex bg-black text-light opacity-50 {labelClass}"
    >
      <div class="flex items-center w-full h-full break-words overflow-hidden">
        <div class="flex-auto w-full">
          {label}
        </div>
      </div>
    </div>
    {/if}

    {#if componentGroup}
    <svelte:component this={componentGroup[component.name]} bind:widget {...component.props} />
    {/if}

  </div>

  {#if editMode}
  <div class="absolute inset-0"></div>
  <span
    on:click={dispatch.bind(null, "remove")}
    class="absolute text-danger hover:bg-red-800 hover:text-gray-200 right-0 px-1 cursor-pointer"
  >✕</span>
  {/if}

</div>
