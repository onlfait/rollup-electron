<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let label = "Select a file";
  export let accept = "*";

  let input = "";

  function onChange(event) {
    dispatch("file", event.target.files[0]);
    input.value = "";
  }
</script>

<div class="file-input">
  <button class="p-2 bg-purple-500 rounded">{label}</button>
  <input type="file" bind:this={input} {accept} on:change="{onChange}"/>
</div>

<style>
  .file-input {
    overflow: hidden;
    position: relative;
    display: inline-block;
  }

  .file-input > input {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    position: absolute;
  }
</style>
