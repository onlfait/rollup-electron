<script>
  import { getContext } from "svelte";
  import AnimeIcon from "./AnimeIcon.svelte";
  import InfoPanel from "./Settings/Panels/Info.svelte";
  import AttrsPanel from "./Settings/Panels/Attrs.svelte";
  import StylePanel from "./Settings/Panels/Style.svelte";

  const { items, selectedItem } = getContext("Editor");

  $: info = $selectedItem ? Object.entries($selectedItem.target.info) : [];
  $: attrs = $selectedItem ? Object.entries($selectedItem.target.attrs) : [];
  $: style = $selectedItem ? Object.entries($selectedItem.target.style) : [];

  function onAttrsChange({ detail }) {
    const { key, value } = detail;
    console.log("onAttrsChange", {key, value});
    // TODO check value, min, max, etc...
    $selectedItem.target.attrs[key] = value;
    $items = $items;
  }

  function onStyleChange({ detail }) {
    const { key, value } = detail;
    console.log("onStyleChange", {key, value});
    // TODO check value, min, max, etc...
    $selectedItem.target.style[key] = value;
    $items = $items;
  }
</script>

{#if $selectedItem}
  <div class="flex pl-2 items-center space-x-2 bg-primary-dark">
    <AnimeIcon type={$selectedItem.target.type} />
    <div class="p-2 pl-0 truncate flex-1">{$selectedItem.target.name}</div>
  </div>
  <InfoPanel {info} />
  <AttrsPanel {attrs} on:change={onAttrsChange} />
  <StylePanel {style} on:change={onStyleChange} />
{:else if $items.length}
  <div class="p-2 truncate bg-primary-dark">
    No file selected...
  </div>
{:else}
  <div class="p-2 truncate bg-primary-dark">
    No files added...
  </div>
  <div class="p-2">
    Drop some file on the timeline ;)
  </div>
{/if}
