<script>
  import { getContext } from "svelte";
  import AnimeIcon from "./AnimeIcon.svelte";
  import Panel from "./Settings/Panel.svelte";
  import Input from "./Settings/Input.svelte";

  import { getAttrProps } from "../libs/anime";

  const { items, selectedItem } = getContext("Editor");

  $: info = $selectedItem ? Object.entries($selectedItem.target.info) : [];
  $: attrs = $selectedItem ? Object.entries($selectedItem.target.attrs) : [];

  function onAttributeChange(key, { target }) {
    // TODO check value, min, max, etc...
    $selectedItem.target.attrs[key] = target.value;
    $items = $items;
  }
</script>

{#if $selectedItem}

<div class="flex pl-2 items-center space-x-2 bg-primary-dark">
  <AnimeIcon type={$selectedItem.target.type} />
  <div class="p-2 pl-0 truncate flex-1">{$selectedItem.target.name}</div>
</div>

<Panel title="Info" expended={false}>
  {#each info as [key, value] (key)}
  <div class="p-2 flex space-x-2 items-center">
    <div class="flex-auto">{key}</div>
    <div>{value}</div>
  </div>
  {/each}
</Panel>

<Panel title="Attributes" expended={true}>
  {#each attrs as [key, value] (key)}
  <div class="p-2 flex space-x-2 items-center">
    <Input
      label={key}
      props={getAttrProps($selectedItem, key)}
      on:change={onAttributeChange.bind(null, key)}
    />
  </div>
  {/each}
</Panel>

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
