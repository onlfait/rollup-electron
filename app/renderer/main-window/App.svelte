<script>
  import "./components/DarkMode.svelte";
  import Landing from "./components/Landing.svelte";
  import UserDrawer from "./components/UserDrawer.svelte";

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
</script>

{#if !user}
<Landing on:login={openTwitchLogin} />
{/if}

{#if user}
<UserDrawer {user} />
{/if}
