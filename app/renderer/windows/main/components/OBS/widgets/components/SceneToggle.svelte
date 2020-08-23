<script>
  import { currentScene, setCurrentScene } from "../../../../stores/obs";

  import WidgetWrapper from "../../WidgetWrapper.svelte";

  export let widget = null;
  export let scene1 = null;
  export let scene2 = null;

  $: target = $currentScene === scene2 ? scene1 : scene2;
</script>

<WidgetWrapper
  on:click={setCurrentScene.bind(null, target)}
  class="items-center cursor-pointer hover:bg-black hover:bg-opacity-25"
>
	<div class="px-2 pt-2 text-xs opacity-25">{$currentScene}</div>
  <div class="flex p-2 font-bold text-xl h-full items-center">
    <div>{target}</div>
  </div>
</WidgetWrapper>
