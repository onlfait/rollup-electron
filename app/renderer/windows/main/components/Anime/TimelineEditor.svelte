<script>
  import { createEventDispatcher } from "svelte";
  import { createAnimeFile, createKeyframe, pixelPerMs } from "./utils";

  import Timeline from "./Timeline.svelte";
  import TimelineModal from "./TimelineModal.svelte";
  import TimelineViewer from "./TimelineViewer.svelte";
  import TimelineFileEdit from "./TimelineFileEdit.svelte";

  export let animes;

  let state = { left: 0, scale: 1 };
  let keyframes = {};
  let files = [];
  let file;

  const dispatch = createEventDispatcher();

  function onClose() {
    dispatch("close");
  }

  function addAnimeFromFile(file) {
    createAnimeFile(file).then(animeFile => {
      animeFile.attrs["z-index"] += files.length;
      files = [...files, animeFile];
      keyframes[animeFile.id] = [];
    }).catch(error => {
      console.warn(error); // TODO notify user
    });
  }

  function onFiles({ detail }) {
    detail.forEach(addAnimeFromFile);
  }

  function onState({ detail }) {
    state = detail;
  }

  function onSelectFile({ detail }) {
    file = detail;
  }

  function updateFile(file) {
    files = files.map(f => f.id === file.id ? { ...f, ...file } : f);
  }

  function onUpdateFile({ detail }) {
    updateFile(detail);
  }

  function clampDelay(delay) {
    return Math.max(0, parseInt(delay));
  }

  function onAddKeyframe({ detail }) {
    const { file, offsets } = detail;
    const delay = clampDelay(offsets.x / state.scale * pixelPerMs);
    const keyframe = createKeyframe(delay, {});
    keyframes[file.id] = [...keyframes[file.id], keyframe];
  }
</script>

<TimelineModal
  on:close={onClose}
  on:files={onFiles}>
  <div slot="topbar">
    Topbar...
  </div>
  <TimelineViewer {files} />
  <TimelineFileEdit {file} on:update={onUpdateFile} />
  <div slot="timeline" class="h-full">
    <Timeline
      {state}
      {files}
      {keyframes}
      on:state={onState}
      on:selectFile={onSelectFile}
      on:addKeyframe={onAddKeyframe}
    />
  </div>
</TimelineModal>
