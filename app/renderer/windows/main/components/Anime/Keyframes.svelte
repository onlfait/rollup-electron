<script>
  import Keyframe from "./Keyframe.svelte";

  export let anime;
  export let x = 0;
  export let scale = 1;

  export let cls = "";
  export { cls as class };

  anime.keyframes = [
    { x: 0 },
    { x: 10 },
    { x: 25 },
    { x: 75 },
    { x: 155 },
    { x: 255 },
  ];

  function updateKeyframe(index, props) {
    anime.keyframes = anime.keyframes.map((keyframe, i) => {
      return i === index ? { ...keyframe, ...props } : keyframe;
    });
  }

  function onMove(index, { detail }) {
    const keyframe = anime.keyframes[index];
    const x = Math.max(0, keyframe.x + detail.dx);
    updateKeyframe(index, { x });
  }

  function onSelect(index) {
    const keyframe = anime.keyframes[index];
    console.log("select:", index, keyframe);
  }
</script>

<div class="px-2 overflow-hidden {cls}">
	<div class="relative w-full h-full">
    <div class="absolute top-0 bottom-0" style="left:{x}px">
      {#each anime.keyframes as keyframe, i}
      <Keyframe
        {scale}
        {keyframe}
        on:move={onMove.bind(null, i)}
        on:mousedown={onSelect.bind(null, i)}
      />
      {/each}
    </div>
	</div>
</div>
