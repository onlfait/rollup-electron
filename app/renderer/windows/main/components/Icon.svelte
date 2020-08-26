<script>
  export let icon = null;
  export let cls = '';

  export { cls as class };
</script>

<span class="flex inline-block w-6 h-6 {cls}">
  <svelte:component this={icon} />
</span>
