<script>
  import { createEventDispatcher } from "svelte";

  export let value = "";
  export let label = null;
  export let bg = "gray-400";
  export let text = "gray-700";

  const dispatch = createEventDispatcher();

  function onKeypress(event) {
    if (event.keyCode == 13) {
      dispatch("enterKey");
    }
  }

  $: color = `bg-${bg} text-${text}`;
  $: inputRounded = label ? 'rounded-r' : 'rounded';
</script>

<label class="{color} inline-flex flex-shrink-0 items-center rounded">
  {#if label}<span class="px-2 uppercase">{label}</span>{/if}
  <input bind:value on:input on:change on:keypress={onKeypress} class="p-2 text-dark {inputRounded}">
</label>
