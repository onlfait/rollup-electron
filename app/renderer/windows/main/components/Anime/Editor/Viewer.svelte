<script>
  import { getAnimeProps, getAnimeStyle, getAnimeText } from "../libs/anime";

  export let animes;
</script>

{#each animes as anime (anime.id)}
  {#if anime.type === "image"}
  <img
    class="absolute"
    id="anime-{anime.id}"
    {...getAnimeProps(anime)}
    style={getAnimeStyle(anime)}
    src="/public/media/images/{anime.filename}" alt={anime.id}
  />
  {:else if anime.type === "video"}
  <video
    class="absolute"
    id="anime-{anime.id}"
    {...getAnimeProps(anime)}
    style={getAnimeStyle(anime)}
    src="/public/media/videos/{anime.filename}">
    <track kind="captions" />
  </video>
  {:else if anime.type === "sound"}
  <audio
    class="hidden"
    id="anime-{anime.id}"
    {...getAnimeProps(anime)}
    src="/public/media/sounds/{anime.filename}">
    <track kind="captions" />
  </audio>
  {:else if anime.type === "text"}
  {#await getAnimeText(anime) then text}
  <div
    class="absolute"
    id="anime-{anime.id}"
    {...getAnimeProps(anime)}
    style={getAnimeStyle(anime)}>
    {text}
  </div>
  {/await}
  {/if}
{/each}
