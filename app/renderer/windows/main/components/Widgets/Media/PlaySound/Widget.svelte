<script>
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let file;
  export let volume;
  export let startOffset;

  function playSound() {
    app.remote.call("actions.playSound", { file, volume, startOffset });
  }
</script>

<WidgetButton {widget} on:click={playSound}>
  <div class="p-2 break-all opacity-25">
    {file}
  </div>
</WidgetButton>
