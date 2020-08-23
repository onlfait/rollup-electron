<script>
  import FileInput from "../../../FileInput.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  export let widget = null;
  export let file = null;

  function removeFile() {
    widget.component.props.file = null;
  }

  async function onFile({ detail }) {
    if (!detail) return;
    let { name, path } = detail;
    name = await app.remote.call('upload.gridSound', { name, path });
    widget.component.props.file = name;
  }

  $: sound = widget.component.props.file;
</script>

<div class="flex flex-wrap">
  <div class="flex flex-col">
    <div class="font-medium">Sound</div>
    <div class="flex items-center space-x-2">
      <FileInput label="Upload sound" accept="audio/*" on:file="{onFile}" />
      <button class="p-2 bg-purple-600 rounded">Select sound</button>
      {#if sound}
      <audio controls src="/public/media/sounds/{sound}" />
      <span on:click={removeFile} class="ml-2 w-8 h-8 text-gray-500 hover:text-danger-dark">
        <MdDelete />
      </span>
      {:else}
      <span class="ml-1 italic">No sound selected</span>
      {/if}
    </div>
  </div>
</div>
