<script>
  import pannable from "./pannable.js";
  import Keyframes from "./Keyframes.svelte";

  export let timeline;

  let x = 0;
  let scale = 1;
  let panning = false;

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

  function onPanStart() {
    panning = true;
  }

  function onPanMove({ detail }) {
    x = Math.min(0, x + detail.dx);
  }

  function onPanEnd() {
    panning = false;
  }

  function onWheel(event) {
    scale += event.deltaY / 1000;
    scale = Math.max(0.1, Math.min(3, scale));
  }
</script>

<style>
.timeline-grid {
  display: grid;
  grid-template-columns: 30% auto;
}

.timeline-grid > :global(div) {
  border-right: 1px rgba(0,200,242,0.2) solid;
  border-bottom: 1px rgba(0,200,242,0.2) solid;
}

.timeline-grid :global(.bg-0) {
  background-color: rgba(0,0,0,0.1);
}

.timeline-grid :global(.bg-1) {
  background-color: rgba(0,0,0,0.2);
}
</style>

<div
  use:pannable
  on:wheel|preventDefault={onWheel}
  on:panstart={onPanStart}
  on:panmove={onPanMove}
  on:panend={onPanEnd}
  class="flex flex-col h-full bg-primary select-none"
>

  <div class="timeline-grid bg-primary-darker">
    <div class="px-2">Settings...</div>
    <div class="px-2">Timeline...</div>
  </div>

  <div
    on:drop={onDrop}
    on:dragover={onDragOver}
    class="flex-auto overflow-x-hidden overflow-y-auto"
  >
    <div class="timeline-grid">
    {#each timeline as anime, i}
      <div class="px-2 truncate bg-{i%2}">{anime.file.name}</div>
      <Keyframes class="bg-{i%2}" bind:anime {x} {scale} />
    {/each}
    </div>
  </div>

</div>
