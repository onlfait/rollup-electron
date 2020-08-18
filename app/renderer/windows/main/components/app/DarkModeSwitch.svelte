<script>
  import { _ } from "../../../../i18n"
  import { darkMode } from "../../stores/app";
</script>

<label {...$$props}>
  <input type="checkbox" bind:checked={$darkMode}> {_('sentences.darkMode')}
</label>
