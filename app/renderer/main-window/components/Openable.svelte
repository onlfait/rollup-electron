<script>
  export let openOnEnter = false;
  export let closeOnLeave = false;
  export let closeOnClickOutside = true;

  let opened = false;
  let hovering = false;

  const open = () => (opened = true);
  const close = () => (opened = false);
  const toggle = () => (opened = !opened);

  const enter = () => {
    hovering = true;
    openOnEnter && open();
  };

  const leave = () => {
    hovering = false;
    closeOnLeave && close();
  };

  document.addEventListener("click", () => {
    closeOnClickOutside && !hovering && close();
  });
</script>

<div
  {...$$props}
  on:click="{toggle}"
  on:mouseenter={enter}
  on:mouseleave={leave}>
  <slot>open</slot>
  {#if opened}
  <slot name="open">Empty "open" slot.</slot>
  {/if}
</div>
