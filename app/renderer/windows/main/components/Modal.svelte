<script>
  import { onMount } from "svelte";

  let element = null;

  function stopPropagation(e) {
    e.stopPropagation();
  }

  onMount(() => {
    document.body.append(element);
  });

</script>

<div bind:this={element} class="modal">
  <div on:click|stopPropagation class="absolute z-50 inset-0 bg-black opacity-75"></div>
  <div on:click|stopPropagation class="absolute z-50 inset-0">
    <div class="flex justify-center h-screen">
      <div class="flex items-center h-screen overflow-auto">
        <div on:click={stopPropagation}>
          <slot />
        </div>
      </div>
    </div>
  </div>
</div>
