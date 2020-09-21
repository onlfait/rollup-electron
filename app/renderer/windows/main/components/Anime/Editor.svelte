<script>
  import Layout from "./Editor/Layout.svelte";
</script>

<Layout>
  <div slot="leftPane">
    left pane...
  </div>
  <div slot="rightPane" class="bg-primary-dark h-full shadow">
    right pane...
  </div>
  <div slot="bottomPane" class="bg-primary-darker h-full shadow">
    bottom pane...
  </div>
</Layout>
