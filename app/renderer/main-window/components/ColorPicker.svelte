<script>
  import ChromePicker from "svelte-color/Chrome.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let show = false;
  export let options = {
    startColor: "#fff",
    disableAlpha: true
  };

  let color;
  let chrome;

  document.addEventListener("click", () => {
    show = false;
  });

  function toggle() {
    show = true;
  }

  function onColor(event) {
    dispatch("color", event.detail);
  }
</script>

<div>
  {#if show}
  <div class="absolute z-50 bg-gray-500 text-gray-800" on:click|stopPropagation>
    <ChromePicker
      {...options}
      bind:color
      bind:this={chrome}
      on:input={onColor}
    />
  </div>
  {/if}
  <button
    on:click|stopPropagation={toggle}
    class="px-2 uppercase text-gray-200 bg-pink-900 rounded"
  >Select a color</button>
</div>
