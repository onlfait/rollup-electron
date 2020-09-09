<script>
  import { v4 as uuid } from "uuid";
  import Keyframe from "./Keyframe.svelte";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let anime;
  export let x = 0;
  export let scale = 1;
  export let selected;

  export let cls = "";
  export { cls as class };

  function addKeyframe(props) {
    anime.keyframes = [ ...anime.keyframes, {
      id: uuid(), x: 0, ...props
    }];
  }

  function addKeyframeAtMousePos(event) {
    const bbox = event.currentTarget.getBoundingClientRect();
    addKeyframe({ x: Math.max(0, (event.clientX - bbox.x - x - 10) / scale) });
  }

  function updateKeyframe(props) {
    anime.keyframes = anime.keyframes.map(keyframe => {
      if (props.id === keyframe.id) {
        keyframe = { ...keyframe, ...props };
        dispatch("update", { anime, keyframe });
      }
      return keyframe;
    });
  }

  function onMove({ detail }) {
    const { keyframe, move } = detail;
    const x = Math.max(0, keyframe.x + move.dx / scale);
    updateKeyframe({ ...keyframe, x });
  }

  function onSelect({ detail }) {
    const { keyframe } = detail;
    dispatch("select", { anime, keyframe });
  }
</script>

<div class="px-2 overflow-hidden {cls}">
	<div class="relative w-full h-full" on:dblclick={addKeyframeAtMousePos}>
    <div class="absolute top-0 bottom-0" style="left:{x}px">
      {#each anime.keyframes as keyframe}
      <Keyframe
        {scale}
        {keyframe}
        selected={selected && selected.id === keyframe.id}
        on:move={onMove}
        on:select={onSelect}
      />
      {/each}
    </div>
	</div>
</div>
