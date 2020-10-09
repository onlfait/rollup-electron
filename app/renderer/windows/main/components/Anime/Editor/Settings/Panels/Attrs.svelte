<script>
  import { createEventDispatcher } from "svelte";
  import { attrsDefs } from "../../../libs/settings";

  import Panel from "../Panel.svelte";
  import Input from "../Input.svelte";

  export let attrs;

  const dispatch = createEventDispatcher();

  let expended = true;
  $: visible = attrs.length;

  function onChange(key, { target }) {
    dispatch("change", { key, value: target.value });
  }
</script>

<Panel title="Attributes" {expended} {visible}>
  {#each attrs as [key, value] (key)}
  <Input
    label={key}
    {value}
    {...attrsDefs[key].input}
    on:change={onChange.bind(null, key)}
  />
  {/each}
</Panel>
