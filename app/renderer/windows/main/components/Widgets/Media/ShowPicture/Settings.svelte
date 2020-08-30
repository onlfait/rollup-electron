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
    const file = await app.remote.call("upload.image", detail.path);
    props.file = file;
  }
</script>

<div id="widget-{widget.id}" class="flex flex-col">
  <div class="font-medium">Select picture</div>
  <div class="flex items-center space-x-2">
    <Button class="bg-primary-lighter">Select picture</Button>
    <FileInput class="bg-primary-light" label="Upload picture" accept="image/*" on:file="{onFile}" />
    {#if props.file}
    <img class="h-10 rounded" src="/public/media/images/{props.file}" alt={props.file} />
    <Button icon={MdDelete} on:click={removeFile} textColor="text-secondary-darker hover:text-light" class="hover:bg-red-500" />
    {:else}
    <span class="ml-1 italic">No picture selected</span>
    {/if}
  </div>
</div>
