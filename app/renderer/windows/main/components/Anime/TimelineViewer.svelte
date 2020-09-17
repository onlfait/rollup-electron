<script>
  export let files = [];

  function getStyle(attrs) {
    let ret = "";
    Object.entries(attrs).forEach(([key, value]) => {
      ret += `${key}:${value}px;`;
    });
    return ret; // + "transform: translate(0,0,0) rotate(0);";
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
