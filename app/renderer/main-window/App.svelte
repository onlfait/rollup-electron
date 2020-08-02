<script>
  // import Landing from "./components/Landing.svelte";
  import Topbar from "./components/app/Topbar.svelte";
  import Content from "./components/app/Content.svelte";
</script>

<style>
  #app {
    overflow: hidden;
    height: calc(100% - var(--titlebar-height));
  }

  #app-content {
    overflow: auto;
  }
</style>

<div id="app" class="flex flex-col">
  <div id="app-topbar">
    <Topbar />
  </div>
  <div id="app-content" class="flex-auto">
    <Content />
  </div>
</div>
