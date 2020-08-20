<script>
  import { connected, streaming, recording, status } from "../../stores/obs";
  import OBSConnectButton from "./ConnectButton.svelte";
  import { _ } from "../../../../i18n"

  let _off = _('words.off');

  let recordingStatus = _off;
  let streamingStatus = _off;

  let fps = '0';
  let cpu = '0';
  let mem = '0';

  const timecode = t => {
    const timecode = $status[`${t}-timecode`];
    return timecode && timecode.split('.')[0] || _off;
  }

  $: streamingStatus = $status && $streaming ? timecode('stream') : _off;
  $: recordingStatus = $status && $recording ? timecode('rec') : _off;

  $: if ($status) {
    fps = parseInt($status["fps"]);
    mem = parseInt($status["memory-usage"]);
    cpu = parseFloat($status["cpu-usage"]).toFixed(1);
  }

  $: connectButtonColor = $connected ? 'bg-red-500' : 'bg-green-500';
</script>

<div class="flex  items-center">
  <div class="flex space-x-1 text-sm">
    <div class="px-2 flex">
      <OBSConnectButton class="flex-auto px-2 uppercase {connectButtonColor} rounded" />
    </div>
    <div class="bg-black opacity-25 rounded px-2">
      {_("words.stream")}: {streamingStatus}
    </div>
    <div class="bg-black opacity-25 rounded px-2">
      {_("words.record")}: {recordingStatus}
    </div>
  </div>
  {#if $connected}
  <div class="flex-auto mx-1"></div>
  <div class="flex-auto">
    <div class="flex space-x-1 text-sm">
      <div class="bg-black opacity-25 rounded px-2">FPS {fps}</div>
      <div class="bg-black opacity-25 rounded px-2">MEM <span class="inline-block">{mem} MB</span></div>
      <div class="bg-black opacity-25 rounded px-2">CPU <span class="inline-block">{cpu} %</span></div>
    </div>
  </div>
  {/if}
</div>
