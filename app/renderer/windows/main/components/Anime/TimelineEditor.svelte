<script>
  import { createEventDispatcher } from "svelte";
  import { createAnimeFile } from "./utils";

  import Timeline from "./Timeline.svelte";
  import TimelineModal from "./TimelineModal.svelte";
  import TimelineViewer from "./TimelineViewer.svelte";
  import TimelineFileEdit from "./TimelineFileEdit.svelte";

  export let animes;

  let state = { left: 0, scale: 1 };
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
      on:state={onState}
      on:selectFile={onSelectFile} />
  </div>
</TimelineModal>
