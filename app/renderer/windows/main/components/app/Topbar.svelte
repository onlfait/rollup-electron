<script>
  import Drawer from "./Drawer.svelte";
  import OBSTopbar from "../OBS/Topbar.svelte";
  import DeckTopbar from "../Deck/Topbar.svelte";
</script>

<div id="app-topbar" class="flex flex-col">
  <div class="flex items-center bg-primary text-light">
    <div class="p-2 flex-auto"><OBSTopbar /></div>
    <div class="p-2"><Drawer /></div>
  </div>
  <DeckTopbar />
</div>
