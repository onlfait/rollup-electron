<script>
  import TimelineRow from "./TimelineRow.svelte";

  export let timeline;

  function addFile(file) {
    timeline = [ ...timeline, { file, attributes: [] } ];
  }

  function onDrop(event) {
    event.preventDefault();
    [...event.dataTransfer.files].forEach(addFile);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  $: console.log(timeline);
</script>

<div
  on:drop={onDrop}
  on:dragover={onDragOver}
  class="bg-primary h-full overflow-x-hidden overflow-y-auto"
>
{#each timeline as item}
  <TimelineRow bind:item />
{/each}
</div>
