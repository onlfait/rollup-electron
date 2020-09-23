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
<div class="p-2 bg-primary flex space-x-2 cursor-pointer" on:click={toggle}>
  <Icon icon={expended ? MdExpandLess : MdExpandMore} />
  <div class="truncate">{ title }</div>
</div>

{#if expended}
<div class="{divide}">
  <slot />
</div>
{/if}

{/if}
