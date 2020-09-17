<script>
  import { createEventDispatcher } from "svelte";
  import { createAnimeFile } from "./utils";

  import Timeline from "./Timeline.svelte";
  import TimelineModal from "./TimelineModal.svelte";
  import TimelineViewer from "./TimelineViewer.svelte";

  export let animes;

  let files = [];

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }

  function addAnimeFromFile(file) {
    createAnimeFile(file).then(animeFile => {
      files = [...files, animeFile];
    }).catch(error => {
      console.warn(error); // TODO notify user
    });
  }

  function onFiles({ detail }) {
    detail.forEach(addAnimeFromFile);
  }
</script>

<TimelineModal on:close={close} on:files={onFiles}>
  <div slot="topbar">
    Topbar...
  </div>
  <div class="h-full overflow-hidden">
  <TimelineViewer {files} />
  </div>
  <div slot="timeline" class="h-full">
    <Timeline {files} />
  </div>
</TimelineModal>
