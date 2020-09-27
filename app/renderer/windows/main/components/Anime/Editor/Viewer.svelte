<script>
  import { getAnimeAttributes } from "../libs/anime";

  export let animes;

  function getStyle({ attributes }) {
    let style = ["max-width:none"];
    Object.entries(attributes).forEach(([label, value]) => {
      const { unit, isProp } = getAnimeAttributes(label);
      if (!isProp) style.push(`${label}:${value}${unit || "" }`);
    });
    return style.join(";");
  }

  function getProps({ attributes }) {
    let props = {};
    Object.entries(attributes).forEach(([label, value]) => {
      const { unit, isProp } = getAnimeAttributes(label);
      if (isProp) props[label] = `${value}${unit || "" }`;
    });
    return props;
  }

  async function getText(anime) {
    return fetch(`/public/media/texts/${anime.filename}`)
      .then(response => response.text());
  }
</script>

{#each animes as anime}
  {#if anime.type === "image"}
  <img
    class="absolute"
    id="anime-{anime.id}"
    {...getProps(anime)}
    style={getStyle(anime)}
    src="/public/media/images/{anime.filename}" alt={anime.id}
  />
  {:else if anime.type === "video"}
  <video
    class="absolute"
    id="anime-{anime.id}"
    {...getProps(anime)}
    style={getStyle(anime)}
    src="/public/media/videos/{anime.filename}">
    <track kind="captions" />
  </video>
  {:else if anime.type === "sound"}
  <audio
    class="hidden"
    id="anime-{anime.id}"
    {...getProps(anime)}
    src="/public/media/sounds/{anime.filename}">
    <track kind="captions" />
  </audio>
  {:else if anime.type === "text"}
  {#await getText(anime) then text}
  <div
    class="absolute"
    id="anime-{anime.id}"
    {...getProps(anime)}
    style={getStyle(anime)}>
    {text}
  </div>
  {/await}
  {/if}
{/each}
