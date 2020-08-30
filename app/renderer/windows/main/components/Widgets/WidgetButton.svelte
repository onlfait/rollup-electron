<script>
  export let widget;
  export let disabled = false;

  let classList = "absolute inset-0 flex w-full h-full cursor-pointer items-center justify-center hover:bg-black hover:bg-opacity-25";
</script>

<div id="widget-button-{widget.id}" class="{classList} {disabled && 'pointer-events-none'}" on:click>
  {#if disabled}
  <div class="p-2 rounded text-center font-bold transform -rotate-45 bg-black opacity-50">
    <slot name="disabled" />
  </div>
  {:else}
  <slot />
  {/if}
</div>
