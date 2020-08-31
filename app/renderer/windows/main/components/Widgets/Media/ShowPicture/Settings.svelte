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
  }

  async function onFile({ detail }) {
    if (!detail) return;
    const file = await app.remote.call("upload.image", detail.path);
    props.file = file;
  }
</script>

<div id="widget-{widget.id}" >

  <div class="flex flex-col">
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

  <div class="flex flex-col">
    <div class="font-medium">Duration in seconds</div>
    <input
      type="number"
      min={0}
      step={0.1}
      bind:value={duration}
      class="p-2 flex-auto rounded w-16"
    />
  </div>

</div>
