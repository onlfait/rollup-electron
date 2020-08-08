<script>
  import { recording, send } from "../../../stores/obs";

  function toggleRecord() {
    send($recording ? "StopRecording" : "StartRecording");
  }
</script>

<div
  on:click={toggleRecord}
  class="flex flex-col w-full h-full items-center cursor-pointer hover:bg-black hover:bg-opacity-25"
>
	<div class="flex p-2 font-bold text-xl h-full items-center">
    <div>{$recording ? "Stop" : "Start"} recording</div>
  </div>
</div>
