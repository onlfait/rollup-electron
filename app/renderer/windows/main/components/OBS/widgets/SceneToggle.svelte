<script>
  import { currentScene, setCurrentScene } from "../../../stores/obs";

  export let scene1 = null;
  export let scene2 = null;

  $: target = $currentScene === scene2 ? scene1 : scene2;
</script>

<div
  on:click={setCurrentScene.bind(null, target)}
  class="flex flex-col w-full h-full items-center cursor-pointer hover:bg-black hover:bg-opacity-25"
>
	<div class="px-2 pt-2 text-xs opacity-25">{$currentScene}</div>
  <div class="flex p-2 font-bold text-xl h-full items-center">
    <div class="">
      {target}
    </div>
  </div>
</div>
