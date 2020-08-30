<script>
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let file;
  export let volume;

  function playSound() {
    app.remote.call("actions.push", {
      name: "playSound",
      type: "immediat",
      props: { file, volume }
    });
  }
</script>

<WidgetButton {widget} on:click={playSound} disabled={!file}>
  <div slot="disabled">No file selected</div>
</WidgetButton>
