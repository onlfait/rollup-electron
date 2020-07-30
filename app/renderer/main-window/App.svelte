<script>
  import Landing from "./components/Landing.svelte";
  import Topbar from "./components/Topbar.svelte";
  import UserDrawer from "./components/UserDrawer.svelte";
  import ActionsGrid from "./components/ActionsGrid.svelte";

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
<UserDrawer {user} />
<Topbar />
<ActionsGrid />
{/if}
