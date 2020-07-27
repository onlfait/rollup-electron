<script>
	let user = null;
	let loading = false;
	let darkMode = true;

	remote.isDarkMode().then(r => darkMode = r);

	$: remote.setDarkMode(darkMode);

	function openTwitchChat() {
	  remote.openTwitchChat();
	}

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

{#if loading}
	<h1>loading...</h1>
{:else if user}
<h1>Hello {user.display_name}</h1>
	<button on:click={openTwitchChat}>Open chat window</button>
{:else}
	<h1>Please login with your Twitch account.</h1>
	<button on:click={openTwitchLogin}>Login to Twitch</button>
{/if}

<label>
	<input type="checkbox" bind:checked={darkMode}> Dark mode ({darkMode})
</label>
