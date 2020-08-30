<script>
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let file;
  export let width;
  export let duration;

  function showPicture() {
    app.remote.call("actions.push", {
      name: "showPicture",
      type: "immediat",
      props: { file, width, duration }
    });
  }
</script>

<WidgetButton {widget} on:click={showPicture}>
  <div slot="disabled">No file selected</div>
</WidgetButton>
