<script>
  import pannable from "../pannable.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let left = 0;

  function onPanMove({ detail }) {
    const x = Math.min(0, left + detail.dx);
    dispatch("panmove", { x, dx: detail.dx });
  }

  function onDoubleClick(event) {
    const clientX = event.clientX;
    const { x } = event.currentTarget.getBoundingClientRect();
    dispatch("dblclick", { x: clientX - x - left, clientX });
  }
</script>

<div
  use:pannable
  on:panmove={onPanMove}
  on:dblclick={onDoubleClick}
  class="relative w-full h-full"
>
  <div class="absolute top-0 bottom-0" style="left:{left}px">
    <slot />
  </div>
</div>
