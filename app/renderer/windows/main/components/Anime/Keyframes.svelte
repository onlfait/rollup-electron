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
</script>

<div class="px-2 overflow-hidden {cls}">
	<div class="relative w-full h-full">
    <div class="absolute top-0 bottom-0" style="left:{x}px">
      {#each anime.keyframes as keyframe}
      <Keyframe bind:keyframe {scale} />
      {/each}
    </div>
	</div>
</div>
