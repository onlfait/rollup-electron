<script>
  import ChromePicker from "svelte-color/Chrome.svelte";
  import { createEventDispatcher } from "svelte";
  import Openable from "./Openable.svelte";
  import Button from "./Button.svelte";

  const dispatch = createEventDispatcher();

  let color;

  export let options = {
    startColor: "#fff",
    disableAlpha: true
  };

  function onColor(event) {
    dispatch("color", event.detail);
  }
</script>

<Openable>
  <Button text="light">Select a color</Button>
  <div slot="open">
    <div class="absolute z-50 bg-gray-500 text-gray-800">
      <ChromePicker
        {...options}
        bind:color
        on:input={onColor}
      />
    </div>
  </div>
</Openable>
