<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import Icon from "./Icon.svelte";

  const dispatch = createEventDispatcher();

  export let closeCross = false;

  let element = null;

  let colors = "bg-black bg-opacity-75";
  let position = "absolute left-0 right-0 bottom-0 z-50";
  let content = "p-10 flex justify-center overflow-auto";

  let cls = "";
  export { cls as class };

  function close() {
    dispatch("close");
  }

  onMount(() => {
    document.body.append(element);
  });
</script>

<div bind:this={element} on:click|stopPropagation class="{position} {content} {colors}" style="top:32px">
  <div class="relative flex flex-col min-w-full md:min-w-1/2">
    <div class="flex-auto"></div>
    <div class="mb-10 text-dark bg-light rounded {cls}">
      {#if closeCross}
      <div on:click={close} class="absolute right-0 mt-2 mr-2">
        <Icon icon={MdClose} class="cursor-pointer" />
      </div>
      {/if}
      <slot />
    </div>
    <div class="flex-auto"></div>
  </div>
</div>
