<script>
  import { darkMode } from "../../stores/app";
</script>

<label {...$$props}>
  <input type="checkbox" bind:checked={$darkMode}> Dark mode
</label>
