<script>
  import MdSettings from "svelte-icons/md/MdSettings.svelte";
  import Button from "../Button.svelte";
  import Grid from "./Grid.svelte";

  export let panel = null;

  let grid = null;
  let editMode = false;

  $: { panel && grid && grid.toggleEditMode(false); }

  function onEditMode({ detail }) {
    editMode = detail;
  }
</script>

<div class="flex space-x-2 p-2">
  <span class="font-bold">{panel.name}</span>
  <Button on:click={grid.toggleEditMode.bind(null, null)} py="0" h="6">
    <span class="w-4 h-4"><MdSettings /></span>
  </Button>
  {#if editMode}
  <Button on:click={grid.adjust} py="0" bg="secondary">Adjust grid</Button>
  <Button on:click={grid.addItem} py="0" bg="secondary">Add item</Button>
  {/if}
</div>

<Grid bind:this={grid} {panel} on:editMode={onEditMode} />
