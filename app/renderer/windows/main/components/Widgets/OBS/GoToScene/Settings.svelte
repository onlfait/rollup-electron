<script>
  import SceneSelect from "../SceneSelect.svelte";
  import WidgetWrapper from "../WidgetWrapper.svelte";

  export let widget;
  export let props;
</script>

<WidgetWrapper {widget}>
  <SceneSelect label="Select scene" bind:scene={props.scene} />
</WidgetWrapper>
