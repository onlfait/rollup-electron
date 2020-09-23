<script>
  import AnimeIcon from "./AnimeIcon.svelte";
  import Panel from "./Settings/Panel.svelte";

  export let currentAnime;

  let info = [];
  let attributes = [];

  $: info = currentAnime && Object.entries(currentAnime.info);
  $: attributes = currentAnime && Object.keys(currentAnime.attributes);
</script>

{#if currentAnime}
  <div class="p-2 flex space-x-2 bg-primary-dark">
    <AnimeIcon type={currentAnime.type} />
    <div class="truncate">{currentAnime.filename}</div>
  </div>
  <Panel title="Info" visible={info.length}>
    {#each info as [key, value]}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{key}</div>
      <div>{value}</div>
    </div>
    {/each}
  </Panel>
  <Panel title="Attributes" visible={attributes.length}>
    {#each attributes as key}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{key}</div>
    </div>
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
