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
    id="file-{file.id}"
    style={getStyle(file.attrs)}
    src="/public/media/images/{file.name}" alt={file.id}
  />
  {/if}
{/each}
