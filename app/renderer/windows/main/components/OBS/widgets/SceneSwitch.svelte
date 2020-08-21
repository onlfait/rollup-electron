<script>
  import { currentScene, setCurrentScene } from "../../../stores/obs";

  export let item = null;
  export let scene = null;
</script>

<div
  on:click={setCurrentScene.bind(null, scene)}
  class="flex flex-col w-full h-full items-center cursor-pointer hover:bg-black hover:bg-opacity-25"
>
	<div class="flex p-2 font-bold text-xl h-full items-center">
    <div>{scene}</div>
  </div>
</div>
