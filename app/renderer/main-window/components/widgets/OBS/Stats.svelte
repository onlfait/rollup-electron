<script>
  import { opened, stats} from "../../../stores/obs";

  let fps = null;
  let mem = null;
  let cpu = null;

  $: _stats = $stats && $stats.stats;

  $: if (_stats) {
    fps = parseInt(_stats["fps"]);
    mem = parseInt(_stats["memory-usage"]);
    cpu = parseFloat(_stats["cpu-usage"]).toFixed(1);
  }

  // $: console.log("_stats:", _stats);
</script>

{#if $opened && _stats}
<div class="flex space-x-1 text-sm">
  <div class="bg-black opacity-25 rounded px-2">FPS {fps}</div>
  <div class="bg-black opacity-25 rounded px-2">MEM {mem} MB</div>
  <div class="bg-black opacity-25 rounded px-2">CPU {cpu} %</div>
</div>
{:else}
<div>OBS closed</div>
{/if}
