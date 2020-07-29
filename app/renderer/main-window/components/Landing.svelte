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
    <LogoSVG width="142" class="fill-current text-pink-900" />
    <div class="flex flex-col items-center text-gray-300">
      <h1 class="text-5xl">Hello You !</h1>
      <p class="mb-5">Welcome home, please login with your Twitch account.</p>
      <button
        class="flex items-center justify-center px-4 py-2 text-3xl bg-pink-900 rounded"
        on:click={login}
      >
        <TwitchSVG width="28" class="fill-current mr-2" /> Connect with Twitch.tv
      </button>
    </div>
  </div>
</div>
