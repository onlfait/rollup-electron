<script>
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let action;
  export let props;

  const send = { name: "playSound", type: action.type, props };
</script>

<WidgetButton {widget} action={send} disabled={!props.file}>
  <div slot="disabled">No file selected</div>
</WidgetButton>
