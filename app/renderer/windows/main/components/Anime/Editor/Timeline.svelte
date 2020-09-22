<script>
  import Icon from "../../Icon.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import { isSameAnime, getAnimeIcon } from "../libs/anime";

  export let animes;
  export let timeline;
  export let currentAnime;

  function onState({ detail: state }) {
    timeline = { ...timeline, state };
  }

  function onResize({ detail: splitter }) {
    timeline = { ...timeline, splitter };
  }

  function selectAnime(anime) {
    if (isSameAnime(currentAnime, anime)) return;
    currentAnime = anime;
  }

  function selectedClass(currentAnime, anime) {
    return isSameAnime(currentAnime, anime) ? "bg-black bg-opacity-25" : "";
  }
</script>

<Grid {...timeline} on:resize={onResize} on:state={onState}>
  <div slot="header" class="p-2 truncate">
    Play / Pause / Replay
  </div>
  <div slot="header" class="p-2 truncate">
    Timeline...
  </div>
  {#each animes as anime}
    <div class="p-2 flex space-x-2 {selectedClass(currentAnime, anime)}" on:click={selectAnime.bind(null, anime)}>
      <Icon icon={getAnimeIcon(anime.type)} class="w-4 h-4 flex-shrink-0" />
      <div class="truncate">{anime.filename}</div>
    </div>
    <div class="p-2 truncate {selectedClass(currentAnime, anime)}" on:click={selectAnime.bind(null, anime)}>
      {anime.id}
    </div>
  {/each}
</Grid>
