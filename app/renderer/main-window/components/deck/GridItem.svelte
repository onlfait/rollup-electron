<script>
  import { createEventDispatcher } from "svelte";

  export let item = null;
  export let editMode = false;

  const dispatch = createEventDispatcher();

  $: bg = `background-color: ${item.color};`;
  $: icon = item.icon ? `background-image: url("/public/grid-icons/${item.icon.name}");` : "";
</script>

<div class="flex h-full bg-center bg-no-repeat bg-cover" style="{icon} {bg}">
  {#if editMode}
  <span
    on:click={dispatch.bind(null, "remove")}
    class="absolute text-danger hover:bg-red-800 hover:text-gray-200 right-0 px-1 cursor-pointer"
  >✕</span>
  {/if}
  {#if item.label}
  <div class="bg-black text-light opacity-50 text-center absolute bottom-0 right-0 left-0 px-2 overflow-hidden truncate">
    {item.label}
  </div>
  {/if}
</div>
