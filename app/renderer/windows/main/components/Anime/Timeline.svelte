<script>
  import Icon from "../Icon.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import Keyframes from "./Timeline/Keyframes.svelte";
  import {
    animeTypes,
    animeAttrs,
    animeIcons,
    getFileExt,
    animeFactory
  } from "./utils";

  export let animes;

  const state = { left: 0 };

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

  function onPanMove({ detail }) {
    state.left = detail.x;
  }

  function onDoubleClick(anime, { detail }) {
    console.log("onDoubleClick:", { anime, detail });
  }
</script>

<Grid on:drop={onDrop}>
{#each animes as anime, i}
  <div class="flex bg-{i%2}">
    <Icon icon={animeIcons[anime.target.type]} class="m-2 mr-0 w-4 h-4 flex-shrink-0" />
    <div class="p-2 flex-auto truncate">{anime.target.label}</div>
    <div class="py-2 px-4 cursor-pointer hover:bg-blue-500">⁝</div>
  </div>
  <div class="px-2 overflow-hidden bg-{i%2}">
    <Keyframes
      left={state.left}
      on:panmove={onPanMove}
      on:dblclick={onDoubleClick.bind(null, anime)}
    >
      {anime.id}
    </Keyframes>
  </div>
{/each}
</Grid>
