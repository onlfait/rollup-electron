<script>
  import Icon from "../Icon.svelte";
  import TimelineGrid from "./TimelineGrid.svelte";
  import { animeTypes, animeAttrs, animeIcons, getFileExt, animeFactory } from "./utils";

  export let animes;

  function addAnime(target) {
    animes = [ ...animes, animeFactory(target) ];
  }

  function addAnimeFromFile(file) {
    const ext = getFileExt(file);
    const type = animeTypes[ext];

    if (!type) {
      // TODO notify user
      return console.warn(`WARN >>> Unsupported extension "${ext}"`);
    }

    const label = file.name;
    const attrs = { ...animeAttrs[type] };

    addAnime({ type, label, file, attrs });
  }

  function onDrop({ detail }) {
    detail.forEach(addAnimeFromFile);
  }
</script>

<TimelineGrid on:drop={onDrop}>
{#each animes as anime, i}
  <div class="flex bg-{i%2}">
    <Icon icon={animeIcons[anime.target.type]} class="m-2 mr-0 w-4 h-4 flex-shrink-0" />
    <div class="p-2 flex-auto truncate">{anime.target.label}</div>
    <div class="py-2 px-4 cursor-pointer hover:bg-blue-500">⁝</div>
  </div>
  <div class="flex bg-{i%2}">
    <div class="p-2">{anime.id}</div>
  </div>
{/each}
</TimelineGrid>
