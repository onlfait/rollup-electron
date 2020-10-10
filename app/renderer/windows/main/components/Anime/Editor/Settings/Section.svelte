<script>
  import Icon from "../../../Icon.svelte";
  import MdExpandMore from "svelte-icons/md/MdExpandMore.svelte";
  import MdExpandLess from "svelte-icons/md/MdExpandLess.svelte";

  export let visible = true;
  export let expended = true;

  let divide = "divide-y divide-blue-600 divide-opacity-50";

  function toggle() {
    expended = !expended;
  }
</script>

{#if visible}
  <div on:click={toggle} class="flex px-2 items-center space-x-2 bg-primary-dark cursor-pointer">
    <slot name="title" />
    <Icon icon={expended ? MdExpandLess : MdExpandMore} class="ml-2 flex-shrink-0" />
  </div>
  {#if expended}
  <div class="{divide}">
    <slot />
  </div>
  {/if}
{/if}
