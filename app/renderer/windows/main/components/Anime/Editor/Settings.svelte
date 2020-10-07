<script>
  import AnimeIcon from "./AnimeIcon.svelte";
  import Panel from "./Settings/Panel.svelte";
  // import Input from "./Settings/Input.svelte";

  export let items;
  export let state;

  $: item = state.selectedItem;
  $: info = item ? Object.entries(item.target.data) : [];

  const attributes = {
    text: ["top", "left", "width", "font-size", "color"],
    audio: ["volume"],
    image: ["top", "left", "width", "height"],
    video: ["top", "left", "width", "height", "volume"]
  };

  const defaults = {
    top: { type: "number", value: 0 },
    left: { type: "number", value: 0 },
    width: { type: "number", value: 800 },
    height: { type: "number", value: 600 },
    volume: { type: "number", value: 0.8 },
    color: { type: "string", value: "#555425" },
    "font-size": { type: "number", value: 42 },
  };

  $: attrs = item ? attributes[item.target.type].map(label => {
    const value = item.target.data[label] || defaults[label].value;
    return [label, value];
  }) : [];
</script>

{#if item}

<div class="flex pl-2 items-center space-x-2 bg-primary-dark">
  <AnimeIcon type={item.target.type} />
  <div class="p-2 pl-0 truncate flex-1">{item.target.name}</div>
</div>

<Panel title="Info" expended={false}>
  {#each info as [label, value] (label)}
  <div class="p-2 flex space-x-2 items-center">
    <div class="flex-auto">{label}</div>
    <div>{value}</div>
  </div>
  {/each}
</Panel>

<Panel title="Attributes" expended={true}>
  {#each attrs as [label, value] (label)}
  <div class="p-2 flex space-x-2 items-center">
    <div class="flex-auto">{label}</div>
    <div>{value}</div>
  </div>
  {/each}
</Panel>

{:else}

<div class="p-2 truncate bg-primary-dark">
  No files added...
</div>
<div class="p-2">
  Drop some file on the timeline ;)
</div>

{/if}
