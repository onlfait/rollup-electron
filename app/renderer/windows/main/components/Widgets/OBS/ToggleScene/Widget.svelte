<script>
  import WidgetWrapper from "../WidgetWrapper.svelte";
  import WidgetButton from "../../WidgetButton.svelte";
  import { currentScene, setCurrentScene } from "../../../../stores/obs";

  export let widget;
  export let props;

  $: target1 = $currentScene === props.scene2 ? props.scene1 : props.scene2;
  $: target2 = target1 === props.scene1 ? props.scene2 : props.scene1;
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
