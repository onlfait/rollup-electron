<script>
  import Button from "../../../Button.svelte";
  import FileInput from "../../../FileInput.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  export let widget = null;

  function removeFile() {
    widget.props.component.file = null;
  }

  async function onFile({ detail }) {
    if (!detail) return;
    const file = await app.remote.call('upload.sound', detail.path);
    widget.props.component.file = file;
  }

  $: sound = widget.props.component.file;
</script>

<div class="flex flex-col">
  <div class="font-medium">Sound</div>
  <div class="flex items-center space-x-2">
    <FileInput class="bg-primary-lighter" label="Upload sound" accept="audio/*" on:file="{onFile}" />
    <Button class="bg-primary-light">Select sound</Button>
    {#if sound}
    <audio controls src="/public/media/sounds/{sound}" />
    <Button icon={MdDelete} on:click={removeFile} textColor="text-secondary-darker hover:text-light" class="hover:bg-red-500" />
    {:else}
    <span class="ml-1 italic">No sound selected</span>
    {/if}
  </div>
</div>
