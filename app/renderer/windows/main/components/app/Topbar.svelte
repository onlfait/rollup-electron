<script>
  import Drawer from "./Drawer.svelte";
  import OBSStatus from "../OBS/Status.svelte";
</script>

<div id="app-topbar" class="flex items-center bg-purple-700 text-gray-200">
  <div class="p-2 flex-auto"><OBSStatus /></div>
  <div class="p-2"><Drawer /></div>
</div>
