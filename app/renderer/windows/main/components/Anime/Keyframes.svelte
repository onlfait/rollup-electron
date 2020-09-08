<script>
  import pannable from "./pannable.js";

  export let cls = "";
  export { cls as class };

  export let item;
  export let x = 0;
  export let scale = 1;

  let panning = false;
  let currentKeyframe;

  function selectKeyframe(keyframe) {
    console.log("selectKeyframe:", keyframe);
    currentKeyframe = keyframe;
  }

  function clampDelay(delay) {
    return Math.max(0, delay);
  }

  function addKeyframe(event) {
    const bbox = event.currentTarget.getBoundingClientRect();
    const delay = clampDelay((event.clientX - bbox.x - x - 6) * scale);
    item.keyframes = [...item.keyframes, { delay }];
    selectKeyframe(item.keyframes.length - 1);
  }


  function handlePanStart() {
    panning = true;
  }

  function handlePanMove({ detail }) {
    const delay = currentKeyframe.delay + detail.dx * scale;
    currentKeyframe.delay = clampDelay(delay);
    item.keyframes = item.keyframes;
    // console.log(detail.dx);
  }

  function handlePanEnd() {
    panning = false;
  }
</script>

<div
  on:dblclick={addKeyframe}
  class="relative whitespace-no-wrap overflow-hidden {cls}"
>

  <span class="absolute" style="transform:translateX({x}px)">
    {#each item.keyframes as keyframe, i}
    <span
      class="absolute"
      use:pannable
      on:panstart={handlePanStart}
    	on:panmove={handlePanMove}
    	on:panend={handlePanEnd}
      on:mousedown|stopPropagation={selectKeyframe.bind(null, keyframe)}
      style="transform:translate({keyframe.delay / scale}px, 6px)"
    >
      <div class="w-3 h-3 transform rotate-45 bg-blue-500 bg-opacity-75"></div>
    </span>
    {/each}
  </span>

</div>
