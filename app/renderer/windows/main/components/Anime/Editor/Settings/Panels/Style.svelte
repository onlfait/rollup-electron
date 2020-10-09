<script>
  import { createEventDispatcher } from "svelte";
  import { styleDefs } from "../../../libs/settings";

  import Panel from "../Panel.svelte";
  import Input from "../Input.svelte";

  export let style;

  const dispatch = createEventDispatcher();

  let expended = true;
  $: visible = style.length;

  function onChange(key, { target }) {
    dispatch("change", { key, value: target.value });
  }
</script>

<Panel title="Style" {expended} {visible}>
  {#each style as [key, value] (key)}
  <Input
    label={key}
    {value}
    {...styleDefs[key].input}
    on:change={onChange.bind(null, key)}
  />
  {/each}
</Panel>
