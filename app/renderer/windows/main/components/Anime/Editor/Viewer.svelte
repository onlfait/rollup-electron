<script>
  export let animes;

  function getStyle(attributes) {
    let style = ["max-width:none"];
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "z-index") {
        style.push(`${key}:${value}`);
      } else {
        style.push(`${key}:${value}px`);
      }
    });
    return style.join(";");
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
    style={getStyle(anime.attributes)}
    src="/public/media/images/{anime.filename}" alt={anime.id}
  />
  {:else if anime.type === "video"}
  <video
    class="absolute"
    id="anime-{anime.id}"
    style={getStyle(anime.attributes)}
    src="/public/media/videos/{anime.filename}">
  </video>
  {:else if anime.type === "sound"}
  <audio
    class="hidden"
    id="anime-{anime.id}"
    src="/public/media/sounds/{anime.filename}">
  </audio>
  {:else if anime.type === "text"}
  {#await getText(anime) then text}
  <div class="absolute" style={getStyle(anime.attributes)}>
    {text}
  </div>
  {/await}
  {/if}
{/each}
