<script>
  import SceneSelect from "../SceneSelect.svelte";
  import WidgetWrapper from "../WidgetWrapper.svelte";

  export let widget;
  export let props;
</script>

<WidgetWrapper {widget}>
  <div class="flex flex-wrap space-x-2">
    <SceneSelect label="Select scene n°1" bind:scene={props.scene1} />
    <SceneSelect label="Select scene n°2" bind:scene={props.scene2} />
  </div>
</WidgetWrapper>
