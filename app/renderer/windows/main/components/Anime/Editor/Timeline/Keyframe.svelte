<script>
  import { getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  import pannable from "../../../pannable.js";

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

  function onPanMove({ detail }) {
    dispatch("move", { keyframe, offset: detail.dx / $scale });
  }
</script>

<div class="absolute" style="left:{left}px">
  <div
    use:pannable
    on:panmove={onPanMove}
    on:mousedown|stopPropagation={onSelect}
    class="w-5 h-5 transform rotate-45 {selected} shadow-sm">
  </div>
</div>
