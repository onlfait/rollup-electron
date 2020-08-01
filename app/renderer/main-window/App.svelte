<script>
  import Landing from "./components/Landing.svelte";
  import Topbar from "./components/Topbar.svelte";
  import Drawer from "./components/Drawer.svelte";
  import Grid from "./components/Grid.svelte";

  let user = null;
  let loading = false;

  function openTwitchLogin() {
    if (user) return;

    loading = true;

    remote.twitch("helix.users.getMe", true).then(res => {
      if (res.data) {
        user = res.data;
      }

      loading = false;
    });
  }

  openTwitchLogin();
</script>

{#if !user}
<Landing on:login={openTwitchLogin} />
{/if}

{#if user}
<Drawer {user} />
<Topbar />
<Grid />
{/if}
