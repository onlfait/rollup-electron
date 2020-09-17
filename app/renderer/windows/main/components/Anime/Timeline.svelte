<script>
  import { createEventDispatcher } from "svelte";
  import { getAnimeIcon } from "./utils";

  import Icon from "../Icon.svelte";
  import TimelineGrid from "./TimelineGrid.svelte";

  export let files = [];

  const dispatch = createEventDispatcher();

  function onState({ detail }) {
    dispatch("state", detail);
  }

  function selectFile(file) {
    dispatch("selectFile", file);
  }
</script>

<TimelineGrid on:state={onState}>
{#each files as file, i}
  <div class="flex bg-{i%2}" on:click={selectFile.bind(null, file)}>
    <Icon icon={getAnimeIcon(file.type)} class="m-2 mr-0 w-4 h-4 flex-shrink-0" />
    <div class="p-2 flex-auto truncate">{file.name}</div>
    <div class="py-2 px-4 cursor-pointer hover:bg-blue-500">⁝</div>
  </div>
  <div class="px-2 overflow-hidden bg-{i%2}">
    {files.length}
  </div>
{/each}
</TimelineGrid>
