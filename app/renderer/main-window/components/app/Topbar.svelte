<script>
  import Drawer from "./Drawer.svelte";
  import { opened } from "../../stores/obs";
</script>

<div id="app-topbar" class="flex bg-primary">
  <div class="p-2 flex-auto">Stream is live ?</div>
  <div class="p-2 flex-auto">OBS {$opened ? "opened" : "closed"}</div>
  <div class="p-2 flex-auto">Stats...</div>
  <div class="p-2">
    <Drawer />
  </div>
</div>
