<script>
  import { darkMode } from "../stores.js";

  export let user = null;

  let hovering;
  const enter = () => (hovering = true);
  const leave = () => (hovering = false);
  $: hoveringClass = hovering ? `h-screen bg-gray-${$darkMode ? "900" : "300"}` : "";
</script>

<div
  class="absolute p-1 right-0 {hoveringClass}"
  on:mouseenter={enter} on:mouseleave={leave}
>

  <div class="flex items-center justify-center">
    <img
      src="{user.profile_image_url}"
      class="rounded-full h-8"
      alt="{user.display_name}"
    />
    {#if hovering}
    <span class="px-2">{user.display_name}</span>
    {/if}
  </div>

  {#if hovering}
  <div class="flex flex-col">
    <span class="p-1">action 1</span>
    <span class="p-1">action 2</span>
    <span class="p-1">action 3</span>
    <label class="p-1">
    	<input type="checkbox" bind:checked={$darkMode}> Dark mode
    </label>
  </div>
  {/if}
</div>
