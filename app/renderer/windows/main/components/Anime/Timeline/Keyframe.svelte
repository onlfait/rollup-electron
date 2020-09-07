<script>
  import pannable from "./pannable.js";

  export let keyframe;

  let element;
  let size = 20;
  let panning = false;

  function handlePanStart() {
    panning = true;
  }

  function handlePanMove({ detail }) {
    keyframe.delay += detail.dx;
  }

  function handlePanEnd() {
    panning = false;
  }

  $: x = keyframe.delay - size;
  $: panningClass = panning ? "bg-blue-600 bg-opacity-50" : "bg-black bg-opacity-25";
</script>

<div
  on:click
  use:pannable
  bind:this={element}
	on:panstart={handlePanStart}
	on:panmove={handlePanMove}
	on:panend={handlePanEnd}
  style="transform:translateX({x}px)"
  class="absolute"
>
  <div class="w-5 h-5 {panningClass} transform rotate-45"></div>
</div>
