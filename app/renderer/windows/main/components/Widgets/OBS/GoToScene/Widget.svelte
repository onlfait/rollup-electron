<script>
  import WidgetWrapper from "../WidgetWrapper.svelte";
  import WidgetButton from "../../WidgetButton.svelte";
  import { setCurrentScene } from "../../../../stores/obs";

  export let widget;
  export let props;
</script>

<WidgetWrapper {widget}>
  <WidgetButton {widget} on:click={setCurrentScene.bind(null, props.scene)}>
    <div class="font-bold">{props.scene}</div>
  </WidgetButton>
</WidgetWrapper>
