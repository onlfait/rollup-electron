<script>
  import Button from "../../../Button.svelte";
  import FileInput from "../../../FileInput.svelte";
  import NumberInput from "../../../NumberInput.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  import AnimeSettings from "../../AnimeSettings.svelte";

  export let widget;
  export let props;

  let duration = props.duration / 1000;
  $: props.duration = duration * 1000;

  let delay = props.delay / 1000;
  $: props.delay = delay * 1000;

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

  <div class="flex flex-col mb-1">
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

  <div class="flex flex-row space-x-2 mb-1">
    <NumberInput
      bind:value={props.top}
      label="Top"
    />
    <NumberInput
      bind:value={props.left}
      label="Left"
    />
    <NumberInput
      bind:value={props.width}
      label="Width"
      min={-1}
    />
    <NumberInput
      bind:value={props.height}
      label="Height"
      min={-1}
    />
  </div>

  <div class="flex flex-row space-x-2 mb-2">
    <NumberInput
      step={0.1}
      bind:value={delay}
      label="Delay (sec.)"
    />
    <NumberInput
      step={0.1}
      bind:value={duration}
      label="Duration (sec.)"
    />
  </div>

  <AnimeSettings bind:props />

</div>
