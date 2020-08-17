<script>
  import Drawer from "./Drawer.svelte";
</script>

<div id="app-topbar" class="flex items-center bg-purple-700 text-gray-200">
  <div class="p-2 flex-auto">online/offline</div>
  <div class="p-2 flex-auto">FPS - CPU - MEM</div>
  <div class="p-2"><Drawer /></div>
</div>
