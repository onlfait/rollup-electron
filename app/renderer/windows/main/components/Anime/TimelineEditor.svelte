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

  let currentFile;
  let currentKeyframe;

  const dispatch = createEventDispatcher();

  function onClose() {
    dispatch("close");
  }

  function addAnimeFromFile(file) {
    createAnimeFile(file).then(animeFile => {
      animeFile.attrs["z-index"] += files.length;
      files = [...files, animeFile];
      keyframes[animeFile.id] = [];
      currentFile = animeFile;
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

  function selectFile(file, keyframe = null) {
    if (!currentFile || currentFile.id !== file.id) {
      currentFile = file;
    }
    currentKeyframe = keyframe;
  }

  function selectKeyframe(file, keyframe) {
    if (!currentKeyframe || currentKeyframe.id !== keyframe.id) {
      selectFile(file, keyframe);
    }
  }

  function onSelectFile({ detail }) {
    selectFile(detail);
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
    selectKeyframe(file, keyframe);
  }

  function onSelectKeyframe({ detail }) {
    const { file, keyframe } = detail;
    selectKeyframe(file, keyframe);
  }

  function updateKeyframe(keyframe) {
    const id = currentFile.id;
    keyframes[id] = keyframes[id].map(k => {
      return k.id === keyframe.id ? { ...k, ...keyframe } : k;
    });
    keyframes = keyframes;
  }

  function onUpdateKeyframe({ detail }) {
    updateKeyframe(detail);
    console.log("process anime...");
  }

  function onKeyframeMove({ detail }) {
    const { keyframe, x } = detail;
    keyframe.delay = clampDelay(keyframe.delay + x * pixelPerMs / state.scale);
    updateKeyframe(currentKeyframe = keyframe);
  }
</script>

<TimelineModal
  on:close={onClose}
  on:files={onFiles}>
  <div slot="topbar">
    Topbar...
  </div>
  <TimelineViewer {files} />
  <TimelineFileEdit
    {currentFile}
    {currentKeyframe}
    on:updateFile={onUpdateFile}
    on:updateKeyframe={onUpdateKeyframe}
  />
  <div slot="timeline" class="h-full">
    <Timeline
      {state}
      {files}
      {keyframes}
      {currentKeyframe}
      on:state={onState}
      on:selectFile={onSelectFile}
      on:addKeyframe={onAddKeyframe}
      on:keyframeMove={onKeyframeMove}
      on:selectKeyframe={onSelectKeyframe}
    />
  </div>
</TimelineModal>
