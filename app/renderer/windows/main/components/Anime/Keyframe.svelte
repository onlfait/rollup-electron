<script>
  export let keyframe;
  export let scale = 1;

  $: x = keyframe.x * scale;
</script>

<div class="absolute top-0 bottom-0 flex items-center" style="left:{x}px">
  <div class="w-5 h-5 transform rotate-45 bg-blue-600 bg-opacity-50"></div>
</div>
