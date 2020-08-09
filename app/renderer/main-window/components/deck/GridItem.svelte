<script>
  import widgets from "../widgets";
  import { createEventDispatcher } from "svelte";

  export let item = null;
  export let editMode = false;

  const dispatch = createEventDispatcher();

  $: bg = `background-color: ${item.color};`;
  $: icon = item.icon ? `background-image: url("/public/grid-icons/${item.icon.name}");` : "";
</script>

<div
  style="{icon} {bg}"
  on:dblclick={dispatch.bind(null, "edit")}
  class="flex h-full bg-center bg-no-repeat bg-cover overflow-auto"
>

  <div class="flex flex-col w-full">

    {#if item.label || (item.widget && item.widget.label)}
    <div class="bg-black text-light opacity-50 text-center px-2">
      {item.label || item.widget.label}
    </div>
    {/if}

    {#if item.widget}
    <svelte:component this={widgets[item.widget.name]} bind:item {...item.widget.props} />
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
