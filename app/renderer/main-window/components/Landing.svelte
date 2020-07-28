<script>
    import LogoSVG from "../../../static/marv.svg";
    import TwitchSVG from "../../../static/Twitch_icon.svg";

    import { createEventDispatcher } from "svelte";

	  const dispatch = createEventDispatcher();

    function login() {
      dispatch("login");
    }

</script>

<div class="flex items-center justify-center h-screen overflow-auto">
  <div class="flex flex-col items-center">
    <LogoSVG width="142" />
    <div class="flex flex-col items-center">
      <h1 class="text-5xl">Hello You !</h1>
      <p class="mb-5">Welcome home, please login with your Twitch account.</p>
      <button
        class="flex items-center justify-center p-2 text-3xl bg-purple-500 rounded"
        on:click={login}
      >
        <TwitchSVG width="42" class="mr-2" /> Connect with Twitch.tv
      </button>
    </div>
  </div>
</div>
