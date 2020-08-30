<script>
  import Button from "../../../Button.svelte";
  import FileInput from "../../../FileInput.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  export let widget;
  export let props;

  function removeFile() {
    props.file = null;
  }

  async function onFile({ detail }) {
    if (!detail) return;
    const file = await app.remote.call("upload.sound", detail.path);
    props.file = file;
  }
</script>

<div id="widget-{widget.id}" class="flex flex-col">
  <div class="font-medium">Sound</div>
  <div class="flex items-center space-x-2">
    <Button class="bg-primary-lighter">Select sound</Button>
    {#if props.file}
    <FileInput class="bg-primary-light" label="Upload sound" accept="audio/*" on:file="{onFile}" />
    <audio class="h-10" controls bind:volume={props.volume} src="/public/media/sounds/{props.file}" />
    <Button icon={MdDelete} on:click={removeFile} textColor="text-secondary-darker hover:text-light" class="hover:bg-red-500" />
    {:else}
    <span class="ml-1 italic">No sound selected</span>
    {/if}
  </div>
</div>
