<script>
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";

  const dispatch = createEventDispatcher();

  export let label = "Select a file";
  export let accept = "*";

  let input = "";

  function onChange(event) {
    dispatch("file", event.target.files[0]);
    input.value = "";
  }
</script>

<div class="relative overflow-hidden inline-block">
  <Button {...$$props}>{label}</Button>
  <input
    {accept}
    type="file"
    bind:this={input}
    on:change="{onChange}"
    class="absolute inset-0 opacity-0"
  />
</div>
