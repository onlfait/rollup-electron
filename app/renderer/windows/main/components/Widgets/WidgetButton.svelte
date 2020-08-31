<script>
  import Icon from "../Icon.svelte";
  import MdAutorenew from "svelte-icons/md/MdAutorenew.svelte";

  export let widget;
  export let action;
  export let running = 0;
  export let disabled = false;

  let centerClass = "p-2 rounded text-center font-bold opacity-50";
  let classList = "absolute inset-0 flex w-full h-full cursor-pointer items-center justify-center hover:bg-black hover:bg-opacity-25";

  function sendAction() {
    running++;
    app.remote.call("actions.push", action)
      .then(({ error, response }) => {
        console.log("DONE", { error, response });
        running--;
      }).catch(error => {
        console.warn("WARN", error);
        running--;
      });
  }
</script>

<div
  id="widget-button-{widget.id}"
  class="{classList} {disabled && 'pointer-events-none'}"
  on:click={sendAction}
>
  {#if disabled}
  <div class="{centerClass} bg-black transform -rotate-45">
    <slot name="disabled" />
  </div>
  {:else if running}
  <div class="{centerClass} animate-spin">
    <div class="">
      <Icon icon={MdAutorenew} size="20" />
    </div>
  </div>
  {:else}
  <slot />
  {/if}
</div>
