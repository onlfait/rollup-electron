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
    on:click={dispatch.bind(null, 'remove')}
    class="absolute hover:bg-red-900 hover:text-gray-300 text-xs right-0 px-1 cursor-pointer"
  >✕</span>
  {/if}
</div>
