<script>
  import AnimeIcon from "./AnimeIcon.svelte";
  import Panel from "./Settings/Panel.svelte";

  export let currentAnime;

  let infoEntries = [];
  let attrsKeys = [];

  $: infoEntries = currentAnime && Object.entries(currentAnime.info);
  $: attrsKeys = currentAnime && Object.keys(currentAnime.attributes);
</script>

{#if currentAnime}
  <div class="p-2 flex space-x-2 bg-primary-dark">
    <AnimeIcon type={currentAnime.type} />
    <div class="truncate">{currentAnime.filename}</div>
  </div>
  <Panel title="Info" visible={infoEntries.length}>
    {#each infoEntries as [key, value]}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{key}</div>
      <div>{value}</div>
    </div>
    {/each}
  </Panel>
  <Panel title="Attributes" visible={attrsKeys.length}>
    {#each attrsKeys as key}
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
