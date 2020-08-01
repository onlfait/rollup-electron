<script>
  import Actions from "./Grid/Actions.svelte"
  import EditItem from "./Grid/EditItem.svelte"
  import Panels from "./Grid/Panels.svelte"

  let editItem = false;
</script>

<Actions />

{#if editItem}
<EditItem />
{:else}
<Panels />
{/if}
