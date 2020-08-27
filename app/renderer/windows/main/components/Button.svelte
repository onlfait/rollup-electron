<script>
  import Icon from "./Icon.svelte";

  export let cls = '';
  export { cls as class };
  export let dark = true;
  export let icon = null;
  export let hideLabel = null;

  let color = dark ? 'text-light' : 'text-dark';
</script>

<button
  class="flex space-x-1 p-2 uppercase rounded {color} {cls}"
  {...$$restProps}
  on:click
>
  {#if icon}<Icon {icon} />{/if}
  <slot />
</button>
