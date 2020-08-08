<script>
  import { scene } from "../../../stores/obs";

  export let scene1 = null;
  export let scene2 = null;

  $: target = $scene === scene2 ? scene1 : scene2;

  function setCurrentScene(name) {
    remote.obs.send("SetCurrentScene", { "scene-name": name });
  }
</script>

<div
  on:click={setCurrentScene.bind(null, target)}
  class="flex flex-col w-full"
>
	<div class="p-2 opacity-25">{$scene}</div>
  <div class="p-2 font-bold text-xl cursor-pointer hover:bg-black hover:bg-opacity-25">{target}</div>
</div>
