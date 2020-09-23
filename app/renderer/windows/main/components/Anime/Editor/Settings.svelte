<script>
  import AnimeIcon from "./AnimeIcon.svelte";
  import Panel from "./Settings/Panel.svelte";
  import Input from "./Settings/Input.svelte";

  import { getAnimeAttributes } from "../libs/anime";

  export let animes;
  export let currentAnime;

  let info = [];
  let attributes = [];

  $: info = currentAnime && Object.entries(currentAnime.info);
  $: attributes = currentAnime && Object.keys(currentAnime.attributes);

  function getAttributesProps(label) {
    return getAnimeAttributes(label, { value: currentAnime.attributes[label] });
  }

  function onAttributeChange(label, { currentTarget }) {
    let value = currentTarget.value.trim();
    if (!value.length) {
      currentTarget.value = currentAnime.attributes[label];
      return;
    }
    const props = getAnimeAttributes(label);
    if (typeof props.filter === "function") {
      value = props.filter(value);
    }
    currentAnime.attributes[label] = value;
    animes = animes;
  }
</script>

{#if currentAnime}
  <div class="p-2 flex space-x-2 bg-primary-dark">
    <AnimeIcon type={currentAnime.type} />
    <div class="truncate">{currentAnime.filename}</div>
  </div>
  <Panel title="Info" visible={info.length} expended={false}>
    {#each info as [label, value]}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{label}</div>
      <div>{value}</div>
    </div>
    {/each}
  </Panel>
  <Panel title="Attributes" visible={attributes.length}>
    {#each attributes as label}
    <Input
      {label}
      props={getAttributesProps(label)}
      on:change={onAttributeChange.bind(null, label)} />
    {/each}
  </Panel>
{:else}
  <div class="p-2 truncate bg-primary-dark">
    No files added/selected...
  </div>
  <div class="p-2">
    Drag/Drop some file on the timeline ;)
  </div>
{/if}
