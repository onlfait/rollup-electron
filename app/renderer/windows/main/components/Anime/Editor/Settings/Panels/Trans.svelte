<script>
  import { createEventDispatcher } from "svelte";
  import { transDefs } from "../../../libs/settings";

  import Panel from "../Panel.svelte";
  import Input from "../Input.svelte";

  export let trans;

  const dispatch = createEventDispatcher();

  let expended = true;
  $: visible = trans.length;

  function onChange(key, { target }) {
    dispatch("change", { key, value: target.value });
  }
</script>

<Panel title="Transformations" {expended} {visible}>
  {#each trans as [key, value] (key)}
  <Input
    label={key}
    {value}
    {...transDefs[key].input}
    on:change={onChange.bind(null, key)}
  />
  {/each}
</Panel>
