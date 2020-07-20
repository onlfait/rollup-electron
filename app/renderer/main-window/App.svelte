<script>
	import "./index.css";

	function getMe() {
	  console.log("getMe");
	}

	function chatConnect() {
	  console.log("chatConnect");
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
<button on:click={chatConnect}>chat connect</button>
