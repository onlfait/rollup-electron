<script>
  import { _ } from "@/renderer/i18n";
  import { connected } from "../../../../stores/obs";
  import WidgetButton from "../../WidgetButton.svelte";

  export let widget;
  export let action;
  export let props;

  $: actionPayload = {
    target: "obs",
    name: "SetCurrentScene",
    type: action.type,
    props: { "scene-name": props.scene }
  };

  let offline = _("sentences.obsIsOffline");

  $: disabled = !$connected || !props.scene;
  $: disabledMessage = !$connected ? offline : "No scene selected";
</script>

<WidgetButton {widget} action={actionPayload} {disabled}>
  <div slot="disabled">{disabledMessage}</div>
  <div class="font-bold">{props.scene}</div>
</WidgetButton>
