<script>
  export let icon = null;
  export let w = 6;
  export let h = 6;
  export let size = null;

  export let cls = '';
  export { cls as class };

  if (size) {
    w = h = size;
  }
</script>

<span class="flex inline-block w-{w} h-{h} {cls}">
  <svelte:component this={icon} />
</span>
