<script>
  import pannable from "../pannable.js";
  import { pixelPerMs } from "./utils";

  export let state;
  export let keyframe;
  export let selected = false;

  let offset = 10; // ???

  $: left = keyframe.delay / pixelPerMs * state.scale - offset;
  $: width = keyframe.props.duration / pixelPerMs * state.scale;
</script>

<div
  class="absolute top-0 bottom-0 flex items-center"
  style="left:{left}px"
>
  <div
    class="absolute z-0 h-full bg-black bg-opacity-25"
    style="margin-left:{offset}px;width:{width}px"
  >
  </div>
  <div
  use:pannable
  on:panmove
  on:click|stopPropagation
  on:mousedown|stopPropagation

  class="
    w-5 h-5 z-10 absolute
    transform rotate-45
    bg-opacity-50
    {selected ? 'bg-red-600' : 'bg-blue-600'}
  "></div>
</div>
