<script>
  import {
    connected,
    streaming,
    recording,
    status
  } from "../../../stores/obs";
  import { _ } from "@/renderer/i18n";

  let fps = '0';
  let cpu = '0';
  let mem = '0';

  let _off = _('words.off');

  let recordingStatus = _off;
  let streamingStatus = _off;

  let cls = 'p-2 bg-black rounded';

  const timecode = t => {
    const timecode = $status[`${t}-timecode`];
    return timecode && timecode.split('.')[0] || _off;
  }

  $: if ($status) {
    fps = parseInt($status["fps"]);
    mem = parseInt($status["memory-usage"]);
    cpu = parseFloat($status["cpu-usage"]).toFixed(1);
  }

  $: streamingStatus = $status && $streaming ? timecode('stream') : _off;
  $: recordingStatus = $status && $recording ? timecode('rec') : _off;
  $: streamingClass = $status && $streaming ? 'bg-opacity-25' : 'opacity-25';
  $: recordingClass = $status && $recording ? 'bg-opacity-25' : 'opacity-25';
</script>

{#if $connected}
<div class="{cls} {streamingClass}">{_("words.stream")}: {streamingStatus}</div>
<div class="{cls} {recordingClass}">{_("words.record")}: {recordingStatus}</div>
{/if}

{#if $connected && $streaming}
<div class="{cls} {streamingClass}">FPS {fps}</div>
<div class="{cls} {streamingClass}">MEM <span class="inline-block">{mem} MB</span></div>
<div class="{cls} {streamingClass}">CPU <span class="inline-block">{cpu} %</span></div>
{/if}
