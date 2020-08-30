<script>
  import WidgetWrapper from "../WidgetWrapper.svelte";
  import WidgetButton from "../../WidgetButton.svelte";
  import { setCurrentScene } from "../../../../stores/obs";

  export let widget;
  export let scene;
</script>

<WidgetWrapper {widget}>
  <WidgetButton {widget} on:click={setCurrentScene.bind(null, scene)}>
    <div class="font-bold">{scene}</div>
  </WidgetButton>
</WidgetWrapper>
