<script>
  import Grid from "./Grid.svelte"

  export let panel = null;
</script>

<div class="p-2 bg-gray-800">
  Current panel: {panel.name} !
</div>

<Grid {panel} />
