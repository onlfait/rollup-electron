<script>
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let action;
  export let props;

  $: disabled = !props.timeline.length;

  $: actionPayload = {
    target: "overlay",
    name: "showAnime",
    type: action.type,
    props
  };
</script>

<WidgetButton {widget} action={actionPayload} {disabled}>
  <div slot="disabled">Empty timeline</div>
</WidgetButton>
