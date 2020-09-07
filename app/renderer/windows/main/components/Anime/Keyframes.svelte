<script>
  export let item;
  export let x = 0;
  export let i = 0;
  export let scale = 1;

  function selectKeyframe(i) {
    console.log("selectKeyframe:", item.file.name, item.keyframes[i]);
  }

  function addKeyframe(event) {
    const bbox = event.currentTarget.getBoundingClientRect();
    const delay = (event.clientX - bbox.x - x - 6) * scale;
    item.keyframes = [...item.keyframes, { delay }];
    selectKeyframe(item.keyframes.length - 1);
  }
</script>

<div
  on:dblclick={addKeyframe}
  class="relative bg-{i%2} whitespace-no-wrap overflow-hidden"
>

  <span class="absolute" style="transform:translateX({x}px)">
    {#each item.keyframes as keyframe, i}
    <span class="absolute" style="transform:translate({keyframe.delay / scale}px, 6px)">
      <div class="w-3 h-3 transform rotate-45 bg-blue-500 bg-opacity-75"></div>
    </span>
    {/each}
  </span>

</div>
