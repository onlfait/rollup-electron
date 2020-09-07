<script>
  import { createEventDispatcher } from "svelte";

  export let items = [];
  export let value = null;
  export let disabled = (item, value) => item === value;

  let cls = "";
  export { cls as class };

  const dispatch = createEventDispatcher();

  function change() {
    dispatch("change", value);
  }
</script>

<select
  {...$$restProps}
  bind:value={value}
  on:change={change}
  class="flex-auto text-dark rounded {cls}"
>
  {#each items as item}
    <option value={item} disabled={disabled(item,value)}>{item}</option>
  {/each}
</select>
