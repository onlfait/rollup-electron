<script>
  import { editItem } from "../stores/grid";

  import EditItem from "./Grid/EditItem.svelte";
  import Panels from "./Grid/Panels.svelte";

  import "../styles/grid.css";
</script>

{#if $editItem}
<EditItem />
{:else}
<Panels />
{/if}
