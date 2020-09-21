<script>
  import Layout from "./Editor/Layout.svelte";
  import Timeline from "./Editor/Timeline.svelte";

  import { createAnimeFromFile } from "./libs/anime";

  let animes = [];

  function onDropFiles({ detail: files }) {
    files.forEach(file => {
      createAnimeFromFile(file)
        .then(anime => {
          animes = [...animes, anime];
        })
        .catch(error => {
          console.warn("createAnimeFromFile:", error.message);
        });
    });
  }

  $: console.log("animes:", animes);
</script>

<Layout on:dropFiles={onDropFiles}>
  <div slot="leftPane">
    left pane...
  </div>
  <div slot="rightPane" class="bg-primary-dark h-full shadow">
    right pane...
  </div>
  <div slot="bottomPane" class="bg-primary-darker h-full shadow">
    <Timeline />
  </div>
</Layout>
