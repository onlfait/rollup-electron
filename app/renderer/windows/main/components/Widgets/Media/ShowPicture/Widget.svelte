<script>
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let file;
  export let width;
  export let duration;

  function showPicture() {
    app.remote.call("actions.showPicture", { file, width, duration });
  }
</script>

<WidgetButton {widget} on:click={showPicture}>
  <div class="p-2 break-all opacity-25">
    {file}
  </div>
</WidgetButton>
