<script>
  import Button from "../../Button.svelte";
  import Modal from "../../Modal.svelte";

  import { recording, send } from "../../../stores/obs";

  export let item = null;

  let confirmModal = false;

  function openConfirmModal() {
    confirmModal = true;
  }

  function closeConfirmModal() {
    confirmModal = false;
    // item = { ...item };
  }

  function toggleRecording() {
    send($recording ? "StopRecording" : "StartRecording");
    closeConfirmModal();
  }
</script>

<div
  on:click={openConfirmModal}
  class="flex flex-col w-full h-full items-center cursor-pointer hover:bg-black hover:bg-opacity-25"
>
	<div class="flex p-2 font-bold text-xl h-full items-center">
    <div>{$recording ? "Stop" : "Start"} recording</div>
  </div>
</div>

{#if confirmModal}
<Modal on:click={closeConfirmModal}>
  <div class="p-10 bg-light text-dark rounded overflow-auto shadow">
    <div class="font-medium">Please confirm</div>
    <div>
      <Button text="light" bg="danger" on:click={toggleRecording}>
        <div>{$recording ? "Stop" : "Start"} recording</div>
      </Button>
      <Button text="light" bg="secondary" on:click={closeConfirmModal}>
        <div>Cancel</div>
      </Button>
    </div>
    <label>
      {#if $recording}
      <input type="checkbox" bind:checked={item.widget.confirm.stop}>
      {:else}
      <input type="checkbox" bind:checked={item.widget.confirm.start}>
      {/if}
      Allways confirm before {$recording ? "stop" : "start"}
    </label>
  </div>
</Modal>
{/if}
