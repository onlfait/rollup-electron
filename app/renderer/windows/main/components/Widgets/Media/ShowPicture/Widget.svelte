<script>
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let action;
  export let props;

  $: actionPayload = {
    target: "overlay",
    name: "showPicture",
    type: action.type,
    props
  };
</script>

<WidgetButton {widget} action={actionPayload} disabled={!props.file}>
  <div slot="disabled">No file selected</div>
</WidgetButton>
