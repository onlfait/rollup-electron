<script>
  import { _ } from "@/renderer/i18n";
  import { autoConnectAtStartup } from "../../stores/obs";
</script>

<label {...$$props}>
  <input type="checkbox" bind:checked={$autoConnectAtStartup}>
  {_('sentences.autoConnectAtStartup')}
</label>
