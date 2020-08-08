<script>
  import { streaming, recording } from "../../../stores/obs";

  let rec = null;

  $: if ($recording) {
    rec = $recording.paused ? 'paused' : $recording.timecode;
  } else {
    rec = 'off';
  }
</script>

<div class="flex space-x-1 text-sm">
  <div class="bg-black opacity-25 rounded px-2">
    streaming: {$streaming ? $streaming.timecode : 'off'}
  </div>
  <div class="bg-black opacity-25 rounded px-2">
    recording: {rec}
  </div>
</div>
