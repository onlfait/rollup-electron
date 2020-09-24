<script>
  import pannable from "../../../pannable.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let timeline;

  $: state = timeline.state;
  $: zoom = timeline.zoom;
  $: splitter = timeline.splitter;

  function onPanMove({ detail }) {
    state.left = Math.min(0, state.left + detail.dx);
    timeline = timeline;
  }

  function onDoubleClick(event) {
    const { x } = event.currentTarget.getBoundingClientRect();
    dispatch("add", { offset: (event.clientX - x - state.left) / state.scale });
  }

  function onWheel(event) {
    const delta = event.deltaY / 100;
    const tx = (event.clientX - splitter.x - state.left) / state.scale;
    const newScale = state.scale + (delta / (zoom.sensitivity / state.scale));
    state.scale = Math.max(zoom.min, Math.min(newScale, zoom.max));
    state.left = Math.min(0, -tx * state.scale + event.clientX - splitter.x);
    timeline = timeline;
  }
</script>

<div
  use:pannable
  on:panmove={onPanMove}
  on:dblclick={onDoubleClick}
  on:wheel|preventDefault={onWheel}
  class="relative w-full h-full"
>
  <div class="absolute top-0 bottom-0" style="left:{state.left}px">
    <slot />
  </div>
</div>
