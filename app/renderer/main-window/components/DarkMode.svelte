<script>
  let darkMode = true;

  $: remote.setDarkMode(darkMode);

  remote.isDarkMode().then(r => darkMode = r);
</script>
