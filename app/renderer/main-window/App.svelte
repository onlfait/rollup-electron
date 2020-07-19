<script>
	function getMe() {
		console.log("getMe");
	}

	function chatConnect() {
		console.log("chatConnect");
	}
</script>

<button on:click={getMe}>getMe</button>
<button on:click={chatConnect}>chat connect</button>
