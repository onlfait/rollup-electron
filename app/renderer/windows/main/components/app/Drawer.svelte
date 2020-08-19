<script>
  import { _ } from "../../../../i18n"

  import Openable from "../Openable.svelte";
  import DarkModeSwitch from "./DarkModeSwitch.svelte";
  import LanguageSelect from "./LanguageSelect.svelte";
  import OBSAutoConnectSwitch from "../OBS/AutoConnectSwitch.svelte"

  import MdMenu from 'svelte-icons/md/MdMenu.svelte'
</script>

<Openable class="flex w-6 h-6">
  <div class="cursor-pointer">
    <MdMenu />
  </div>
  <div
    slot="open"
    on:click|stopPropagation
    style="top: 32px"
    class="absolute z-50 ml-8 right-0 bottom-0 overflow-auto shadow-md bg-gray-700 text-gray-200"
  >
    <div class="flex flex-col">
      <span class="p-2">{_('words.login')}</span>
      <span class="p-2">{_('words.settings')}</span>
      <span class="p-2">Action 1</span>
      <span class="p-2">Action 2</span>
      <span class="p-2">Action 3</span>
      <DarkModeSwitch class="p-2" />
      <OBSAutoConnectSwitch class="p-2" />
      <LanguageSelect class="text-black" />
    </div>
  </div>
</Openable>
