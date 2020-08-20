<script>
  import { createEventDispatcher } from "svelte";

  export let value = "";
  export let bg = "primary";

  const dispatch = createEventDispatcher();

  function onKeypress(event) {
    if (event.keyCode == 13) {
      dispatch("enterKey");
    }
  }
</script>

<label class="bg-{bg} text-gray-800 inline-flex flex-shrink-0 items-center rounded">
  <span class="px-2 uppercase"><slot /></span>
  <input bind:value on:input on:change on:keypress={onKeypress} class="p-2 text-dark rounded-r">
</label>
