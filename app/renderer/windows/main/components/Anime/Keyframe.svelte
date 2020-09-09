<script>
  import pannable from "../pannable.js";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let keyframe;
  export let scale = 1;
  export let selected = false;

  $: x = keyframe.x * scale;

  function onPanMove(event) {
    dispatch("move", { keyframe, move: event.detail, event });
  }

  function onMouseDown(event) {
    dispatch("select", { keyframe, event });
  }
</script>

<div
  on:click
  on:dblclick
  use:pannable
  on:panmove={onPanMove}
  on:mousedown|stopPropagation={onMouseDown}
  class="absolute top-0 bottom-0 flex items-center"
  style="left:{x}px"
>
  <div class="
    w-5 h-5
    transform rotate-45
    bg-opacity-50
    {selected ? 'bg-red-600' : 'bg-blue-600'}
  "></div>
</div>
