<script>
  import { _ } from "@/renderer/i18n";
  import DarkModeSwitch from "./DarkModeSwitch.svelte";
  import LanguageSelect from "./LanguageSelect.svelte";

  let style = "top: 32px";
  let colors = "bg-light text-dark dark:bg-dark-lighter dark:text-light";
  let position = "absolute z-50 right-0 bottom-0 ml-8";
  let extra = "overflow-auto shadow-md";
</script>

<div {style} class="{position} {colors} {extra}">
  <div class="flex flex-col">
    <span class="p-4">{_("words.settings")}</span>
    <span class="p-4">Action 1</span>
    <span class="p-4">Action 2</span>
    <span class="p-4">Action 3</span>
    <DarkModeSwitch class="p-4" />
    <LanguageSelect class="mx-4 p-2 text-dark" />
  </div>
</div>
