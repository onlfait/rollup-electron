<script>
  import { setCurrentScene } from "../../../../stores/obs";
  import WidgetWrapper from "../WidgetWrapper.svelte";

  export let widget;
  export let scene;
</script>

<WidgetWrapper {widget}>
  <div
    class="flex w-full h-full cursor-pointer items-center justify-center hover:bg-black hover:bg-opacity-25"
    on:click={setCurrentScene.bind(null, scene)}>
    <div class="font-bold">{scene}</div>
  </div>
</WidgetWrapper>
