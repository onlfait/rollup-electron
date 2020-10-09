<script>
  import { getContext } from "svelte";
  import AnimeIcon from "./AnimeIcon.svelte";
  import InfoPanel from "./Settings/Panels/Info.svelte";
  import AttrsPanel from "./Settings/Panels/Attrs.svelte";
  import StylePanel from "./Settings/Panels/Style.svelte";
  import TransPanel from "./Settings/Panels/Trans.svelte";

  const { items, selectedItem } = getContext("Editor");

  $: info = $selectedItem ? Object.entries($selectedItem.target.info) : [];
  $: attrs = $selectedItem ? Object.entries($selectedItem.target.attrs) : [];
  $: style = $selectedItem ? Object.entries($selectedItem.target.style) : [];
  $: trans = $selectedItem ? Object.entries($selectedItem.target.trans) : [];

  function onChange(type, { detail }) {
    const { key, value } = detail;
    console.log(`on:${type}`, { key, value });
    // TODO check value, min, max, etc...
    $selectedItem.target[type][key] = value;
    $items = $items;
  }
</script>

{#if $selectedItem}
  <div class="flex pl-2 items-center space-x-2 bg-primary-dark">
    <AnimeIcon type={$selectedItem.target.type} />
    <div class="p-2 pl-0 truncate flex-1">{$selectedItem.target.name}</div>
  </div>
  <InfoPanel {info} />
  <AttrsPanel {attrs} on:change={onChange.bind(null, 'attrs')} />
  <StylePanel {style} on:change={onChange.bind(null, 'style')} />
  <TransPanel {trans} on:change={onChange.bind(null, 'trans')} />
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
