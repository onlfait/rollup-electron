<script>
	import "minireset.css";

	import "../commons/styles/index.css";
	import "../commons/styles/scrollbar.css";
		
	import "./index.css";

	let user = null;
	let loading = false;

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

<style>
	:global(body) {
  	color: #fff;
		background-color: #212;
	}
</style>

{#if loading}
	<h1>loading...</h1>
{:else if user}
<h1>Hello {user.display_name}</h1>
	<button on:click={openTwitchChat}>Open chat window</button>
{:else}
	<h1>Please login with your Twitch account.</h1>
	<button on:click={openTwitchLogin}>Login to Twitch</button>
{/if}
