<script>
    export let user = null;

    let hovering;

    const enter = () => (hovering = true);
    const leave = () => (hovering = false);

    $: hoveringClass = hovering ? "h-screen" : "";
</script>

<div
  class="absolute bg-gray-800 p-1 right-0 {hoveringClass}"
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
</div>
