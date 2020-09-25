<script>
  import { createEventDispatcher } from "svelte";

  export let items = [];
  export let value = null;
  export let pad = "p-2";
  export let labelKey = "label";
  export let valueKey = "value";

  let cls = "";
  export { cls as class };

  const dispatch = createEventDispatcher();

  function change() {
    const ret = isObject ? items.find(item => item[valueKey] === value) : value;
    dispatch("change", ret);
  }

  $: isObject = items.length ? typeof items[0] !== "string" : false;
</script>

<select {...$$restProps} class="{pad} flex-1 text-dark rounded {cls}" bind:value={value} on:change={change}>
  {#each items as item}
    {#if isObject}
      <option value={item[valueKey]} disabled={item[valueKey] === value}>
        {item[labelKey]}
      </option>
    {:else}
      <option value={item} disabled={item === value}>{item}</option>
    {/if}
  {/each}
</select>
