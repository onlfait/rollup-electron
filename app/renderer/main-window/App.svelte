<script>
	import "./index.css";

	function getMe() {
	  remote.twitch("helix.users.getMe", true).then(me => {
	    console.log("me:", me);
	  });
	}

	function openTwitchChat() {
	  remote.openTwitchChat();
	}
</script>

<style>
	:global(body) {
  	color: #fff;
		background-color: #212;
	}
</style>

<h1>Hello World</h1>
<button on:click={getMe}>getMe</button>
<button on:click={openTwitchChat}>open chat window</button>
