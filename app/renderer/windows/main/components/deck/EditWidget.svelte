<script>
  import ColorPicker from "../ColorPicker.svelte";

  export let widget = null;

  let color = '#424242';

  function onColor({ detail }) {
    widget = { ...widget, color: detail.hex };
  }
</script>

<div class="flex flex-col bg-gray-200 mx-2 space-y-2">

  <div class="flex flex-col">
    <div class="font-medium">Background color</div>
    <div class="flex items-center">
      <ColorPicker
        startColor={widget.color}
        disableAlpha={true}
        on:color={onColor}
      />
      <div class="ml-2 w-10 h-10" style="background-color: {widget.color}"></div>
    </div>
  </div>

</div>
