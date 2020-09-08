<script context="module">
	let currentKeyframe;
</script>

<script>
  import { v4 as uuid } from "uuid";
  import pannable from "./pannable.js";

  export let cls = "";
  export { cls as class };

  export let anime;
  export let x = 0;
  export let scale = 1;

  let panning = false;

  function selectKeyframe(keyframe) {
    console.log("selectKeyframe:", keyframe);
    currentKeyframe = keyframe;
    anime = anime;
  }

  function clampDelay(delay) {
    return Math.max(0, delay);
  }

  function addKeyframe(event) {
    const bbox = event.currentTarget.getBoundingClientRect();
    const delay = clampDelay((event.clientX - bbox.x - x - 6) * scale);
    const keyframe = { id: uuid(), delay };
    anime.keyframes = [ ...anime.keyframes, keyframe ];
    selectKeyframe(keyframe);
  }


  function handlePanStart() {
    panning = true;
  }

  function handlePanMove({ detail }) {
    const delay = currentKeyframe.delay + detail.dx * scale;
    currentKeyframe.delay = clampDelay(delay);
    anime.keyframes = anime.keyframes;
  }

  function handlePanEnd() {
    panning = false;
  }

  function keyframeClass(keyframe) {
    const current = keyframe.id === currentKeyframe.id;
    return current ? "bg-red-600" : "bg-blue-600";
  }
</script>

<div
  on:dblclick={addKeyframe}
  class="relative whitespace-no-wrap overflow-hidden {cls}"
>

  <span class="absolute" style="transform:translateX({x}px)">
    {#each anime.keyframes as keyframe}
    <span
      class="absolute"
      use:pannable
      on:panstart={handlePanStart}
    	on:panmove={handlePanMove}
    	on:panend={handlePanEnd}
      on:mousedown|stopPropagation={selectKeyframe.bind(null, keyframe)}
      style="transform:translate({keyframe.delay / scale}px, 6px)"
    >
      <div class="w-3 h-3 transform rotate-45 {keyframeClass(keyframe)} bg-opacity-50"></div>
    </span>
    {/each}
  </span>

</div>
