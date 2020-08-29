<script>
  import { _ } from "@/renderer/i18n";
  import { darkMode } from "../../../stores/app";
</script>

<label {...$$props}>
  <input type="checkbox" bind:checked={$darkMode}> {_("sentences.darkMode")}
</label>
