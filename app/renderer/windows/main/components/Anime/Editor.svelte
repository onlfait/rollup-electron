<script>
  import { setContext } from "svelte";
  import createStore from "./libs/store";

import * as anime from "./libs/anime";
  import Layout from "./Editor/Layout.svelte";
  import Viewer from "./Editor/Viewer.svelte";
  import Settings from "./Editor/Settings.svelte";
  import Timeline from "./Editor/Timeline.svelte";

  const store = createStore();
  setContext("Editor", store);

  const { items, selectedItem } = store;

  function addFile(file) {
    anime.createItemFromFile(file)
      .then(item => {
        $items = [ ...$items,  item ];
        if (!$selectedItem) {
          $selectedItem = item;
        }
      })
      .catch(error => {
        console.warn("addFile:", error.message, file);
      });
  }

  function onDropFiles({ detail: files }) {
    files.forEach(addFile);
  }

  $: console.log("items:", $items);
  $: console.log("selectedItem:", $selectedItem);
</script>

<Layout on:dropFiles={onDropFiles}>
  <div slot="leftPane" class="relative h-full overflow-hidden">
    <Viewer class="bg-black" />
  </div>

  <div slot="rightPane" class="bg-primary-darker h-full shadow overflow-auto">
    <Settings />
  </div>

  <div slot="bottomPane" class="bg-primary-dark h-full shadow">
    <Timeline />
  </div>
</Layout>
