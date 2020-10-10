<script>
  import { getContext } from "svelte";
  import Input from "./Input.svelte";
  import TransPanel from "./Panels/Trans.svelte";

  const { items, selectedItem, selectedKeyframe } = getContext("Editor");

  $: trans = $selectedKeyframe ? Object.entries($selectedKeyframe.trans) : [];

  function onKeyframeChange(key, { target }) {
    $selectedKeyframe[key] = parseInt(target.value);
    $items = $items;
  }

  function onChange(type, { detail }) {
    const { key, value } = detail;
    // TODO check value, min, max, etc...
    $selectedKeyframe[type][key] = value;
    $items = $items;
  }

  function onRemove(type, { detail }) {
    const { key } = detail;
    delete $selectedKeyframe[type][key];
    $selectedKeyframe = $selectedKeyframe;
    $selectedItem = $selectedItem;
    $items = $items;
  }
</script>

{#if $selectedKeyframe}
<Input
  type="number"
  label="delay"
  min={0} step={100}
  value={$selectedKeyframe.delay}
  on:change={onKeyframeChange.bind(null, "delay")} />
<Input
  type="number"
  label="duration"
  min={0} step={100}
  value={$selectedKeyframe.duration}
  on:change={onKeyframeChange.bind(null, "duration")} />
<TransPanel {trans}
  on:change={onChange.bind(null, "trans")}
  on:remove={onRemove.bind(null, "trans")} />
{/if}
