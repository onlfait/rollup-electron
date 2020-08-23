<script>
  import { currentScene, setCurrentScene } from "../../../../stores/obs";

  import WidgetWrapper from "../../WidgetWrapper.svelte";

  export let widget = null;
  export let scene = null;
</script>

<WidgetWrapper
  on:click={setCurrentScene.bind(null, scene)}
  class="items-center cursor-pointer hover:bg-black hover:bg-opacity-25"
>
	<div class="flex p-2 font-bold text-xl h-full items-center">
    <div>{scene}</div>
  </div>
</WidgetWrapper>
