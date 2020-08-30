<script>
  import WidgetWrapper from "../WidgetWrapper.svelte";
  import WidgetButton from "../../WidgetButton.svelte";
  import { currentScene, setCurrentScene } from "../../../../stores/obs";

  export let widget;
  export let scene1;
  export let scene2;

  $: target1 = $currentScene === scene2 ? scene1 : scene2;
  $: target2 = target1 === scene1 ? scene2 : scene1;
</script>

<WidgetWrapper {widget}>
  <WidgetButton {widget} on:click={setCurrentScene.bind(null, target1)}>
    <div class="flex flex-col text-center">
      {#if target2 !== $currentScene}
      <div class="text-xs opacity-25">( {target2} )</div>
      {/if}
      <div class="opacity-25">{$currentScene}</div>
      <div class="font-bold">{target1}</div>
    </div>
  </WidgetButton>
</WidgetWrapper>
