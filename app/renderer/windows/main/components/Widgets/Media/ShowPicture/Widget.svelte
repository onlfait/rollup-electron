<script>
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let action;
  export let file;
  export let width;
  export let duration;

  const send = {
      name: "showPicture",
      type: action.type,
      props: { file, width, duration }
    }
</script>

<WidgetButton {widget} action={send} disabled={!file}>
  <div slot="disabled">No file selected</div>
</WidgetButton>
