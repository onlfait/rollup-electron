<script>
  import { connected } from "../../../stores/obs";
  import { _ } from "@/renderer/i18n";

  export let widget;

  let className = "";
  export { className as class };

  let id = `widget-${widget.id}`;

  $: disabled = !$connected && "";
</script>

{#if $connected}
  <slot />
{:else}
  <div
    {id} {...$$restProps} on:click
    class="absolute z-50 inset-0 flex flex-col w-full h-full pointer-events-none {className}"
  >
    <div class="flex p-2 text-xl w-full h-full items-center justify-center">
      <div class="p-2 rounded text-center font-bold transform -rotate-45 bg-black opacity-50">
        {_("sentences.obsIsOffline")}
      </div>
    </div>
  </div>
{/if}
