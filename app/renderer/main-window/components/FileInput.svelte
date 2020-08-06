<script>
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";

  const dispatch = createEventDispatcher();

  export let label = "Select a file";
  export let accept = "*";

  function onChange(event) {
    dispatch("file", event.target.files[0]);
  }
</script>

<div class="file-input">
  <Button>{label}</Button>
  <input type="file" {accept} on:change="{onChange}"/>
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
