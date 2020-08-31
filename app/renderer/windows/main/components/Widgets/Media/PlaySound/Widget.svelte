<script>
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let action;
  export let file;
  export let volume;

  const send = {
    name: "playSound",
    type: action.type,
    props: { file, volume }
  };
</script>

<WidgetButton {widget} action={send} disabled={!file}>
  <div slot="disabled">No file selected</div>
</WidgetButton>
