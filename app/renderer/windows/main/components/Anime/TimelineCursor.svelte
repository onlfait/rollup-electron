<script>
  import pannable from "../pannable.js";
  import { createEventDispatcher } from "svelte";

  export let state;

  const dispatch = createEventDispatcher();

  $: cursorClass = "absolute top-0 bottom-0 bg-red-600 bg-opacity-75";
  $: cursorStyle = `width:3px;left:${state.seek + 7}px;cursor:ew-resize;`;

  function onCursorPan({ detail }) {
    const seek = Math.max(0, state.seek + detail.dx);
    dispatch("state", { ...state, seek });
  }
</script>

<div
  use:pannable
  on:panmove={onCursorPan}
  on:mousedown|stopPropagation
  class={cursorClass}
  style={cursorStyle}
>
</div>
