<script>
  import { createEventDispatcher } from "svelte";

  export let widget = null;
  export let editMode = false;

  const dispatch = createEventDispatcher();

  $: props = widget.props;
  $: label = props.label || (props.component && props.component.label);
  $: bgColor = `background-color: ${props.backgroundColor};`;
  $: bgImage = props.backgroundImage ? `background-image: url("/public/media/images/${props.backgroundImage}");` : "";
</script>

<div
  style="{bgColor} {bgImage}"
  on:dblclick={dispatch.bind(null, "edit")}
  class="flex h-full bg-center bg-no-repeat bg-cover overflow-auto {props.classList}"
>

  <div class="flex flex-col w-full">

    {#if label}
    <div class="bg-black text-light opacity-50 text-center px-2">
      {label}
    </div>
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
