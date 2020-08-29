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
    const file = await app.remote.call('upload.image', detail.path);
    widget.props.component.file = file;
  }

  $: image = widget.props.component.file;
</script>

<div class="flex flex-col">
  <div class="font-medium">Picture</div>
  <div class="flex items-center space-x-2">
    <FileInput class="bg-primary-lighter" label="Upload image" accept="image/*" on:file="{onFile}" />
    <Button class="bg-primary-light">Select image</Button>
    {#if image}
    <img class="h-10 rounded" src="/public/media/images/{image}" alt={image} />
    <Button icon={MdDelete} on:click={removeFile} textColor="text-secondary-darker hover:text-light" class="hover:bg-red-500" />
    {:else}
    <span class="ml-1 italic">No image selected</span>
    {/if}
  </div>
</div>
