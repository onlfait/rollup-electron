<script>
  import Openable from "../Openable.svelte";
  import DarkModeSwitch from "./DarkModeSwitch.svelte";
</script>

<style>
  .top {
    top: var(--titlebar-height);
  }
</style>

<Openable class="flex">
  <div class="cursor-pointer">
    login picture...
  </div>
  <div
    slot="open"
    on:click|stopPropagation
    class="absolute ml-8 top right-0 bottom-0 overflow-auto shadow-md bg-secondary"
  >
    <div class="flex flex-col">
      <span class="p-2">Logout</span>
      <span class="p-2">Profil</span>
      <span class="p-2">Settings</span>
      <span class="p-2">Action 1</span>
      <span class="p-2">Action 2</span>
      <span class="p-2">Action 3</span>
      <DarkModeSwitch class="p-2" />
    </div>
  </div>
</Openable>
