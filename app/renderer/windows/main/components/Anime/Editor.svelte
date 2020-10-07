<script>
  import * as anime from "./libs/anime";
  import Layout from "./Editor/Layout.svelte";
  import Viewer from "./Editor/Viewer.svelte";
  import Settings from "./Editor/Settings.svelte";
  import Timeline from "./Editor/Timeline.svelte";

  let items = [];
  let state = {
    selectedItem: null
  };

  function addFile(file) {
    anime.createItemFromFile(file)
      .then(item => {
        items = [ ...items,  item ];
        if (!state.selectedItem) {
          state.selectedItem = item;
        }
      })
      .catch(error => {
        console.warn("addFile:", error.message, file);
      });
  }

  function onDropFiles({ detail: files }) {
    files.forEach(addFile);
  }

  $: console.log("items:", items);
  $: console.log("state:", state);
</script>

<Layout on:dropFiles={onDropFiles}>
  <div slot="leftPane" class="relative h-full overflow-hidden">
    <Viewer class="bg-black" {items} />
  </div>

  <div slot="rightPane" class="bg-primary-darker h-full shadow overflow-auto">
    <Settings bind:items bind:state />
  </div>

  <div slot="bottomPane" class="bg-primary-dark h-full shadow">
    <Timeline bind:items bind:state />
  </div>
</Layout>
