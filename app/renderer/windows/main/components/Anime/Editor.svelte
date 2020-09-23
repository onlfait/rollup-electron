<script>
  import Layout from "./Editor/Layout.svelte";
  import Timeline from "./Editor/Timeline.svelte";
  import Settings from "./Editor/Settings.svelte";
  import Viewer from "./Editor/Viewer.svelte";

  import { createAnimeFromFile } from "./libs/anime";

  let animes = [];
  let currentAnime = null;

  let timeline = {
    state: { left: 0, scale: 1 },
    zoom: { min: 0.1, max: 10, sensitivity: 50 },
    splitter: { x: 200, width: 4, min: 100, max: 500 }
  };

  function onDropFiles({ detail: files }) {
    files.forEach(file => {
      createAnimeFromFile(file)
        .then(anime => {
          animes = [...animes, anime];
          if (!currentAnime) currentAnime = anime;
        })
        .catch(error => {
          console.warn("createAnimeFromFile:", error.message);
        });
    });
  }

  $: console.log("animes:", animes);
  $: console.log("timeline:", timeline);
  $: console.log("currentAnime:", currentAnime);
</script>

<Layout on:dropFiles={onDropFiles}>

  <div slot="leftPane" class="relative h-full overflow-hidden">
    <Viewer {animes} />
  </div>

  <div slot="rightPane" class="bg-primary-darker h-full shadow overflow-auto">
    <Settings bind:animes bind:currentAnime />
  </div>

  <div slot="bottomPane" class="bg-primary-darker h-full shadow">
    <Timeline bind:timeline bind:animes bind:currentAnime />
  </div>

</Layout>
