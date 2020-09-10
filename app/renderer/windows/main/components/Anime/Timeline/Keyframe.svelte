<script>
  import pannable from "../../pannable.js";
  import { pixelPerMs } from "../utils";

  export let keyframe;
  export let selected = false;

  let offset = 10;

  $: left = keyframe.props.delay / pixelPerMs - offset;
</script>

<div
  use:pannable
  on:panmove
  on:mousedown|stopPropagation
  class="absolute top-0 bottom-0 flex items-center"
  style="left:{left}px"
>
  <div class="
    w-5 h-5
    transform rotate-45
    bg-opacity-50
    {selected ? 'bg-red-600' : 'bg-blue-600'}
  "></div>
</div>
