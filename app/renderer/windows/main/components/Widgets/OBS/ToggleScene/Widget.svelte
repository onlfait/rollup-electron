<script>
  import { _ } from "@/renderer/i18n";
  import WidgetButton from "../../WidgetButton.svelte";
  import { connected, currentScene } from "../../../../stores/obs";

  export let widget;
  export let action;
  export let props;

  $: actionPayload = {
    target: "obs",
    name: "SetCurrentScene",
    type: action.type,
    props: { "scene-name": target1 }
  };

  let offline = _("sentences.obsIsOffline");

  $: target1 = $currentScene === props.scene2 ? props.scene1 : props.scene2;
  $: target2 = target1 === props.scene1 ? props.scene2 : props.scene1;

  $: disabled = !$connected || !props.scene1 || !props.scene2;
  $: disabledMessage = !$connected ? offline : "No scenes selected";
</script>

<WidgetButton {widget} action={actionPayload} {disabled}>
  <div slot="disabled">{disabledMessage}</div>
  <div class="flex flex-col text-center">
    {#if target2 !== $currentScene}
    <div class="text-xs opacity-25">( {target2} )</div>
    {/if}
    <div class="opacity-25">{$currentScene}</div>
    <div class="font-bold">{target1}</div>
  </div>
</WidgetButton>
