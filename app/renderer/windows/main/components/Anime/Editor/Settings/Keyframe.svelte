<script>
  import { getContext } from "svelte";
  import Panel from "./Panel.svelte";
  import Input from "./Input.svelte";
  import Icon from "../../../Icon.svelte";
  import MdAdjust from 'svelte-icons/md/MdAdjust.svelte'

  const { items, selectedKeyframe } = getContext("Editor");

  function onKeyframeChange(key, { target }) {
    $selectedKeyframe[key] = parseInt(target.value);
    $items = $items;
  }
</script>

{#if $selectedKeyframe}
<div class="flex pl-2 items-center space-x-2 bg-primary-dark">
  <Icon icon={MdAdjust} class="w-4 h-4 flex-shrink-0" />
  <div class="p-2 pl-0 truncate flex-1">Keyframe</div>
</div>
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
<Panel title="Keyframe" expended={true} visible={true}>
  ...
</Panel>

{/if}
