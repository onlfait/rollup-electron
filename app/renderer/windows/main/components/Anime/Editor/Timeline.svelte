<script>
  import Grid from "./Timeline/Grid.svelte";
  import Player from "./Timeline/Player.svelte";
  import Item from "./Timeline/Item.svelte";

  export let items;
  export let state;

  let splitter = { x: 200, width: 4, min: 100, max: 500 };
</script>

<Grid bind:splitter>
  <div slot="header" class="p-2 flex splace-x-2">
    <Player />
  </div>
  <div slot="header" class="p-2 truncate">
    Timeline...
  </div>
  {#each items as item (item.id)}
    <Item bind:state bind:items bind:item />
  {/each}
</Grid>
