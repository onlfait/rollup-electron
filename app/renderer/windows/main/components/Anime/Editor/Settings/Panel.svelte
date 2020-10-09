<script>
  import Icon from "../../../Icon.svelte";
  import MdExpandMore from "svelte-icons/md/MdExpandMore.svelte";
  import MdExpandLess from "svelte-icons/md/MdExpandLess.svelte";

  export let title;
  export let visible = true;
  export let expended = true;

  let divide = "divide-y divide-blue-600 divide-opacity-50";

  function toggle() {
    expended = !expended;
  }

</script>

{#if visible}
<div class="flex items-center space-x-2 bg-primary cursor-pointer" on:click={toggle}>
  <Icon icon={expended ? MdExpandLess : MdExpandMore} class="ml-2 flex-shrink-0" />
  <div class="p-2 truncate flex-1">{ title }</div>
  <slot name="title" />
</div>

{#if expended}
<div class="{divide}">
  <slot />
</div>
{/if}

{/if}
