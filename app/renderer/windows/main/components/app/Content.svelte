<script>
  let title = "content";

  const toggle = async () => {
    const darkMode = await app.darkMode.toggle();
    app.titlebar.setTitle(darkMode ? "Nuit" : "Jour");
  };
</script>

<div id="app-content" class="flex flex-col flex-auto overflow-auto">
  {title}
  <button on:click={toggle}>toggle dark mode</button>
</div>
