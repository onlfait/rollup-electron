<script>
  import { connected } from "../../stores/obs";
  import { _ } from "@/renderer/i18n";

  let className = '';
	export { className as class };

  $: disabled = !$connected && 'pointer-events-none bg-black opacity-50';
</script>

<div
  on:click
  {...$$props}
  class="flex flex-col w-full h-full {className} {disabled}"
>
  {#if $connected}
    <slot />
  {:else}
    <div class="flex p-2 font-bold text-xl h-full items-center">
      <div class="text-center font-bold">
        {_('sentences.obsIsOffline')}
      </div>
    </div>
  {/if}
</div>
