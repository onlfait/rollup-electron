<script>
  import { currentScene, setCurrentScene } from "../../../../stores/obs";
  import WidgetWrapper from "../WidgetWrapper.svelte";

  export let widget;
  export let scene1;
  export let scene2;

  $: target1 = $currentScene === scene2 ? scene1 : scene2;
  $: target2 = target1 === scene1 ? scene2 : scene1;
</script>

<WidgetWrapper {widget}>
  <div
    class="flex w-full h-full cursor-pointer items-center justify-center hover:bg-black hover:bg-opacity-25"
    on:click={setCurrentScene.bind(null, target1)}>
    <div class="flex flex-col text-center">
      {#if target2 !== $currentScene}
      <div class="text-xs opacity-25">( {target2} )</div>
      {/if}
      <div class="opacity-25">{$currentScene}</div>
      <div class="font-bold">{target1}</div>
    </div>
  </div>
</WidgetWrapper>
