<script>
	function getMe() {
		console.log("getMe");
	}

	function chatConnect() {
		console.log("chatConnect");
	}
</script>

<style>
	:global(body) {
  	color: red;
		background-color: #111;
	}
</style>

<button on:click={getMe}>getMe</button>
<button on:click={chatConnect}>chat connect</button>
