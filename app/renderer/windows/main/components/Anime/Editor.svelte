<script>
  import { setContext } from "svelte";
  import createStore from "./libs/store";

  import Layout from "./Editor/Layout.svelte";
  import Viewer from "./Editor/Viewer.svelte";
  import Settings from "./Editor/Settings.svelte";
  import Timeline from "./Editor/Timeline.svelte";
  import ViewerItems from "./Editor/Viewer/Items.svelte";

  import createItemFromFile from "./libs/createItemFromFile";

  import animejs from "animejs/lib/anime.es.js";
  import { debounce } from "throttle-debounce";
  import getStyle from "./libs/getStyle";
  import getTrans from "./libs/getTrans";

  const store = createStore();
  setContext("Editor", store);

  const { anime, items, selectedItem } = store;

  function updateAnime() {
    console.log("updateAnime");
    $anime = animejs.timeline({ autoplay: false });

    $items.forEach(item => {
      const targets = `#item-${item.id}`;
      const $target = document.querySelector(targets);
      const trans = getTrans(item.target.trans);
      const style = getStyle(item.target.style);
      $target.style = `${trans};${style}`;
      item.keyframes.forEach(({ delay, duration, trans }) => {
        $anime.add({ targets, duration, ...trans }, delay);
      });
    });
  }

  function resetAnime() {
    console.log("resetAnime");
    $anime = null;
  }

  const updateAnimeDebounce = debounce(1000, updateAnime);
  $: $items.length ? updateAnimeDebounce() : resetAnime();


  function addItem(item) {
    $items = [ ...$items,  item ];
    if (!$selectedItem) {
      $selectedItem = item;
    }
  }

  function addFile(file) {
    createItemFromFile(file)
      .then(addItem)
      .catch(error => {
        console.warn("addFile:", error.message, file);
      });
  }

  function onDropFiles({ detail: files }) {
    files.forEach(addFile);
  }
</script>

<Layout on:dropFiles={onDropFiles}>
  <div slot="leftPane" class="relative h-full overflow-hidden">
    <Viewer>
      <ViewerItems />
    </Viewer>
  </div>
  <div slot="rightPane" class="bg-primary-darker h-full shadow overflow-auto">
    <Settings />
  </div>
  <div slot="bottomPane" class="bg-primary-dark h-full shadow">
    <Timeline />
  </div>
</Layout>
