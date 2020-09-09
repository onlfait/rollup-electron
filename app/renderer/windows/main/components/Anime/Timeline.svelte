<script>
  import { v4 as uuid } from "uuid";
  import pannable from "../pannable.js";
  import Icon from "../Icon.svelte";
  import Keyframes from "./Keyframes.svelte";

  import MdImage from 'svelte-icons/md/MdImage.svelte'
  import MdMusicVideo from 'svelte-icons/md/MdMusicVideo.svelte'

  export let timeline;

  const animeTypes = {
    "ico": "image",
    "gif": "image",
    "png": "image",
    "jpg": "image",
    "jpeg": "image",
    "mp3": "sound",
    "ogg": "sound"
  };

  icons = { "sound": MdMusicVideo, "image": MdImage };

  let x = 0;
  let scale = 1;
  let zoom = { min: 0.1, max: 10, sensitivity: 50 };
  let splitter = { x: 200, width: 4, min: 100, max: 500 };

  let selectedAnime;
  let selectedKeyframe;

  $: splitterStyle = `
    cursor:ew-resize;
    width:${splitter.width}px;
    left:calc(${splitter.x}px - ${splitter.width}px);
  `;

  function addAnime(props) {
    timeline = [ ...timeline, {
      id: uuid(), ...props, keyframes: []
    }];
  }

  function addFile(file) {
    const ext = file.name.split(".").pop().toLowerCase();
    const type = animeTypes[ext];
    if (!type) {
      return console.warn(`WARN >>> Unsupported extension "${ext}"`);
    }
    app.remote.call(`upload.${type}`, file.path)
      .then(filename => addAnime({ type, target: filename }))
      .catch(error => console.warn("WARN >>>", error));
  }

  function onDrop(event) {
    event.preventDefault();
    [...event.dataTransfer.files].forEach(addFile);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function onTimelinePan({ detail }) {
    x = Math.min(0, x + detail.dx);
  }

  function onSplitterPan({ detail }) {
    splitter.x = Math.max(splitter.min, Math.min(splitter.max, detail.x));
  }

  function onWheel(event) {
    const offset = splitter.x + 15;
    const delta = event.deltaY / 100;
    const tx = (event.clientX - offset - x) / scale;
    const newScale = scale + (delta / (zoom.sensitivity / scale));
    scale = Math.max(zoom.min, Math.min(newScale, zoom.max));
    x = Math.min(0, -tx * scale + event.clientX - offset);
  }

  function onUpdateKeyframe({ detail }) {
    selectedAnime = detail.anime;
    selectedKeyframe = detail.keyframe;
    selectedKeyframeX = (selectedKeyframe.x / 100).toFixed(2);
  }

  function selectedKeyframeUpdate() {
    selectedKeyframe.x = selectedKeyframeX * 100;
    timeline = timeline;
  }

  let selectedKeyframeX = 0;

  $: gridTemplate = `grid-template-columns: ${splitter.x}px auto`;
</script>

<style>
.timeline-grid {
  display: grid;
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
  on:panmove={onTimelinePan}
  on:wheel|preventDefault={onWheel}
  class="relative flex flex-col h-full bg-primary select-none"
>

  <div class="timeline-grid bg-primary-darker" style={gridTemplate}>
    <div class="p-2">Settings...</div>
    <div class="p-2">Timeline...</div>
  </div>

  <div
    on:drop={onDrop}
    on:dragover={onDragOver}
    class="flex-auto overflow-x-hidden overflow-y-auto"
  >
    <div class="timeline-grid  whitespace-no-wrap" style={gridTemplate}>
    {#each timeline as anime, i}
      <div class="flex bg-{i%2}">
        <Icon icon={icons[anime.type]} class="m-2 mr-0 w-4 h-4 flex-shrink-0" />
        <div class="p-2 flex flex-auto space-x-2 truncate">{anime.target}</div>
        <div class="py-2 px-4 cursor-pointer hover:bg-blue-500">⁝</div>
      </div>
      <Keyframes
        {anime}
        {x} {scale}
        class="bg-{i%2}"
        selected={selectedKeyframe}
        on:select={onUpdateKeyframe}
        on:update={onUpdateKeyframe}
      />
    {/each}
    </div>
  </div>

  <div
    use:pannable
    on:panmove={onSplitterPan}
    on:mousedown|stopPropagation
    style={splitterStyle}
    class="absolute top-0 bottom-0"
  >
  </div>

</div>

{#if selectedKeyframe}
<div class="absolute flex flex-col bg-primary top-0 right-0">
  <div class="p-2 flex space-x-2">
    <Icon icon={icons[selectedAnime.type]} />
    <div>{selectedAnime.target}</div>
  </div>
  <div class="p-2">{selectedKeyframe.id}</div>
  <div class="p-2 flex">
    <div class="flex-auto">delay</div>
    <div class="text-dark flex-grow-0">
      <input
        type="number"
        step={0.01}
        bind:value={selectedKeyframeX}
        on:input={selectedKeyframeUpdate}
      />
    </div>
  </div>
</div>
{/if}
