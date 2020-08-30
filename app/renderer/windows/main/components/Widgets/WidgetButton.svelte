<script>
  export let widget;

  let classList = "flex w-full h-full cursor-pointer items-center justify-center hover:bg-black hover:bg-opacity-25";
</script>

<div id="widget-button-{widget.id}" class={classList} on:click>
  <slot />
</div>
