<script>
  import pannable from "../../pannable.js";
  import { createEventDispatcher } from "svelte";

  export let state;

  const dispatch = createEventDispatcher();

  const zoom = { min: 0.1, max: 10, sensitivity: 50 };
  const splitter = { x: 200, width: 4, min: 100, max: 500 };

  $: gridTemplate = `grid-template-columns: ${splitter.x}px auto`;
  $: splitterStyle = `
    cursor:ew-resize;
    width:${splitter.width}px;
    left:calc(${splitter.x}px - ${splitter.width}px);
  `;

  function onSplitterPan({ detail }) {
    splitter.x = Math.max(splitter.min, Math.min(splitter.max, detail.x));
  }

  function onDrop(event) {
    event.preventDefault();
    dispatch("drop", [...event.dataTransfer.files]);
  }

  function onWheel(event) {
    const offset = splitter.x + 15;
    const delta = event.deltaY / 100;
    const tx = (event.clientX - offset - state.left) / state.scale;
    const newScale = state.scale + (delta / (zoom.sensitivity / state.scale));
    state.scale = Math.max(zoom.min, Math.min(newScale, zoom.max));
    state.left = Math.min(0, -tx * state.scale + event.clientX - offset);
  }
</script>

<style>
.timeline-grid {
  display: grid;
}

.timeline-grid > :global(div) {
  border-right: 1px rgba(0,200,242,0.2) solid;
  border-bottom: 1px rgba(0,200,242,0.2) solid;
}

.timeline-grid :global(.bg-0) {
  background-color: rgba(0,0,0,0.1);
}

.timeline-grid :global(.bg-1) {
  background-color: rgba(0,0,0,0.2);
}
</style>

<div
  on:drop={onDrop}
  on:dragover|preventDefault
  class="relative flex flex-col h-full bg-primary select-none"
>

  <div class="timeline-grid bg-primary-darker grid" style={gridTemplate}>
    <div class="p-2">Settings...</div>
    <div class="p-2">Timeline...</div>
  </div>

  <div on:wheel={onWheel} class="flex-auto overflow-x-hidden overflow-y-auto">
    <div class="timeline-grid whitespace-no-wrap" style={gridTemplate}>
      <slot />
    </div>
  </div>

</div>

<div
  use:pannable
  on:panmove={onSplitterPan}
  on:mousedown|stopPropagation
  style={splitterStyle}
  class="absolute top-0 bottom-0 select-none"
>
</div>
