<script>
  import { getContext } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const { selectedKeyframe, pixelPerMs, timeline } = getContext("Editor");
  const { scale } = timeline;

  export let keyframe;

  let halfWidth = 10;

  $: left = keyframe.delay / pixelPerMs * $scale - halfWidth;
  $: red = "bg-red-500 bg-opacity-50 border border-red-600 border-opacity-50";
  $: blue = "bg-blue-500 bg-opacity-50 border border-blue-600 border-opacity-50";
  $: selectedId = $selectedKeyframe && $selectedKeyframe.id;
  $: selected = selectedId === keyframe.id ? red : blue;

  function onSelect() {
    dispatch("select", keyframe);
  }
</script>

<div class="absolute" style="left:{left}px">
  <div class="w-5 h-5 transform rotate-45 {selected} shadow-sm" on:click={onSelect}></div>
</div>
