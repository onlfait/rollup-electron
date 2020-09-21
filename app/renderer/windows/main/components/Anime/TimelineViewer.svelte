<script>
  export let files = [];

  function getStyle(attrs) {
    let ret = "max-width:none;";
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "z-index") {
        ret += `${key}:${value};`;
      } else {
        ret += `${key}:${value}px;`;
      }
    });
    return ret;
  }
</script>

{#each files as file}
  {#if file.type === "image"}
  <img
    class="absolute"
    id="image-{file.id}"
    style={getStyle(file.attrs)}
    src="/public/media/images/{file.name}" alt={file.id}
  />
  {:else if file.type === "sound"}
  <audio
    id="sound-{file.id}"
    src="/public/media/sounds/{file.name}"
  >
  </audio>
  {/if}
{/each}
