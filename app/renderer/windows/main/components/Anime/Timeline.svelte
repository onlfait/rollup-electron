<script>
  import TimelineRow from "./Timeline/Row.svelte";

  export let timeline;

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.addEventListener("error", () => reject(reader.error), false);
      reader.readAsDataURL(file);
    });
  }

  function addFile(file) {
    readFileAsDataURL(file)
      .then(dataURL => {
        const type = dataURL.match(/^data:(.+\/.+);/)[1];
        timeline = [ ...timeline, { type, file, dataURL, keyframes: [] } ];
      })
      .catch(error => {
        console.warn("WARN >>>", error);
      });
  }

  function onDrop(event) {
    event.preventDefault();
    [...event.dataTransfer.files].forEach(addFile);
  }

  function onDragOver(event) {
    event.preventDefault();
  }
</script>

<div
  on:drop={onDrop}
  on:dragover={onDragOver}
  class="select-none bg-primary h-full overflow-x-hidden overflow-y-auto"
>
{#each timeline as item}
  <TimelineRow bind:item />
{/each}
</div>
