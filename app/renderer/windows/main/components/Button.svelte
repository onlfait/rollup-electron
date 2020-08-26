<script>
  export let cls = '';
  export { cls as class };
  export let dark = true;

  let color = dark ? 'text-light' : 'text-dark';
</script>

<button
  class="p-2 uppercase rounded {color} {cls}"
  {...$$restProps}
  on:click
>
  <slot />
</button>
