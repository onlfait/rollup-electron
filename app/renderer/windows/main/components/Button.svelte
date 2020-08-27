<script>
  import Icon from "./Icon.svelte";

  export let cls = '';
  export { cls as class };

  export let dark = true;
  export let icon = null;
  export let iconSize = null;
  export let hideLabel = null;

  let color = dark ? 'text-light' : 'text-dark';
</script>

<button
  class="{cls} flex space-x-1 p-2 uppercase rounded {color}"
  {...$$restProps}
  on:click
>
  {#if icon}<Icon {icon} size={iconSize} />{/if}
  <slot />
</button>
