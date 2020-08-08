<script>
  import Drawer from "./Drawer.svelte";
  import { opened } from "../../stores/obs";

  import OBSStats from "../widgets/OBS/Stats.svelte";
  import OBSStreamingStatus from "../widgets/OBS/StreamingStatus.svelte";
</script>

<div id="app-topbar" class="flex items-center bg-primary">
  <div class="p-2 flex-auto"><OBSStreamingStatus /></div>
  <div class="p-2 flex-auto"><OBSStats /></div>
  <div class="p-2">
    <Drawer />
  </div>
</div>
