<script>
  import { createEventDispatcher } from "svelte";

  import components from "../OBS/widgets/components";

  export let widget = null;
  export let editMode = false;

  const dispatch = createEventDispatcher();

  $: bg = `background-color: ${widget.color};`;
  $: icon = widget.icon ? `background-image: url("/public/media/images/${widget.icon.name}");` : "";
</script>

<div
  style="{icon} {bg}"
  on:dblclick={dispatch.bind(null, "edit")}
  class="flex h-full bg-center bg-no-repeat bg-cover overflow-auto"
>

  <div class="flex flex-col w-full">

    {#if widget.label || (widget.component && widget.component.label)}
    <div class="bg-black text-light opacity-50 text-center px-2">
      {widget.label || widget.component.label}
    </div>
    {/if}

    {#if widget.component}
    <svelte:component this={components[widget.component.name]} bind:widget {...widget.component.props} />
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
