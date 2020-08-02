<script>
  import Openable from "../Openable.svelte";
  import DarkModeSwitch from "./DarkModeSwitch.svelte";
  import MdMenu from 'svelte-icons/md/MdMenu.svelte'
</script>

<Openable class="flex w-6 h-6 ">
  <div class="cursor-pointer">
    <MdMenu />
  </div>
  <div
    slot="open"
    on:click|stopPropagation
    style="top: var(--titlebar-height)"
    class="absolute ml-8 right-0 bottom-0 overflow-auto shadow-md bg-secondary"
  >
    <div class="flex flex-col">
      <span class="p-2">Login</span>
      <span class="p-2">Settings</span>
      <span class="p-2">Action 1</span>
      <span class="p-2">Action 2</span>
      <span class="p-2">Action 3</span>
      <DarkModeSwitch class="p-2" />
    </div>
  </div>
</Openable>
