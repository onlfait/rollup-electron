<script>
  import ChromePicker from "svelte-color/Chrome.svelte";
  import { createEventDispatcher } from "svelte";
  import Openable from "./Openable.svelte";

  const dispatch = createEventDispatcher();

  let color;

  let classList;
  export { classList as class };

  export let startColor = "#fff";
  export let disableAlpha = true;

  function onColor(event) {
    dispatch("color", event.detail);
  }
</script>

<Openable>
  <button class="p-2 bg-purple-500 rounded {classList}">Select a color</button>
  <div slot="open">
    <div class="absolute z-50 bg-gray-500 text-gray-800">
      <ChromePicker
        {startColor}
        {disableAlpha}
        bind:color
        on:input={onColor}
      />
    </div>
  </div>
</Openable>
