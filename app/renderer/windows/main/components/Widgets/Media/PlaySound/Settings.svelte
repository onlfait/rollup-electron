<script>
  import Button from "../../../Button.svelte";
  import FileInput from "../../../FileInput.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  export let widget;
  export let props;

  let duration = props.duration / 1000;
  $: props.duration = duration * 1000;

  function removeFile() {
    props.file = null;
    props.duration = 0;
  }

  async function onFile({ detail }) {
    if (!detail) return;
    const file = await app.remote.call("upload.sound", detail.path);
    props.file = file;
  }

</script>

<div id="widget-{widget.id}" class="flex flex-col">
  <div class="font-medium">Select sound</div>
  <div class="flex items-center space-x-2">
    <Button class="bg-primary-lighter">Select sound</Button>
    <FileInput class="bg-primary-light" label="Upload sound" accept="audio/*" on:file="{onFile}" />
    {#if props.file}
    <audio class="h-10" controls bind:duration bind:volume={props.volume} src="/public/media/sounds/{props.file}" />
    <Button icon={MdDelete} on:click={removeFile} textColor="text-secondary-darker hover:text-light" class="hover:bg-red-500" />
    {:else}
    <span class="ml-1 italic">No sound selected</span>
    {/if}
  </div>
</div>
