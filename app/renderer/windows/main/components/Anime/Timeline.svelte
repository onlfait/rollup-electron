<script>
  import { createEventDispatcher } from "svelte";
  import { getAnimeIcon } from "./utils";

  import Icon from "../Icon.svelte";
  import Keyframe from "./Keyframe.svelte";
  import Keyframes from "./Keyframes.svelte";
  import TimelineGrid from "./TimelineGrid.svelte";
  import TimelineCursor from "./TimelineCursor.svelte";

  import MdPause from "svelte-icons/md/MdPause.svelte";
  import MdReplay from 'svelte-icons/md/MdReplay.svelte';
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";

  export let currentKeyframe;
  export let keyframes = {};
  export let files = [];
  export let state;

  const dispatch = createEventDispatcher();

  function onState({ detail }) {
    dispatch("state", detail);
  }

  function selectFile(file) {
    dispatch("selectFile", file);
  }

  function onPanMove({ detail }) {
    dispatch("state", { ...state, left: detail.x });
    dispatch("panMove", detail);
  }

  function addKeyframe(file, { detail }) {
    dispatch("addKeyframe", { file, offsets: detail });
  }

  function selectKeyframe({ file, keyframe }) {
    dispatch("selectKeyframe", { file, keyframe });
  }

  function onKeyframePanMove({ file, keyframe }, { detail }) {
    dispatch("keyframeMove", { file, keyframe, x: detail.dx });
  }

  function playAnime() {
    dispatch("playAnime");
  }

  function restartAnime() {
    dispatch("restartAnime");
  }

  function pauseAnime() {
    dispatch("pauseAnime");
  }

  function onSeek({ detail }) {
    dispatch("seekAnime", detail);
  }

  $: cursorClass = "absolute top-0 bottom-0 bg-red-600";
  $: cursorStyle = `width:2px;left:${state.seek}px;`;
</script>

<TimelineGrid {state} on:state={onState}>
  <div slot="settings" class="p-2 flex space-x-2">
    <Icon
      icon={MdReplay}
      on:click={restartAnime}
      class="w-4 h-4 flex-shrink-0 cursor-pointer" />
    <Icon
      icon={MdPlayArrow}
      on:click={playAnime}
      class="w-4 h-4 flex-shrink-0 cursor-pointer" />
    <Icon
      icon={MdPause}
      on:click={pauseAnime}
      class="w-4 h-4 flex-shrink-0 cursor-pointer" />
  </div>
  <div slot="timeline" class="relative flex">
    <div class="p-2">Timeline...</div>
    <div class="absolute inset-0 overflow-x-hidden">
      <TimelineCursor {state} on:seek={onSeek} on:state={onState} />
    </div>
  </div>
{#each files as file, i}
  <div class="flex bg-{i%2}" on:click={selectFile.bind(null, file)}>
    <Icon icon={getAnimeIcon(file.type)} class="m-2 mr-0 w-4 h-4 flex-shrink-0" />
    <div class="p-2 flex-auto truncate">{file.name}</div>
    <div class="py-2 px-4 cursor-pointer hover:bg-blue-500">⁝</div>
  </div>
  <div class="px-2 overflow-hidden bg-{i%2}" on:click={selectFile.bind(null, file)}>
    <Keyframes
      left={state.left}
      on:panmove={onPanMove}
      on:dblclick={addKeyframe.bind(null, file)}
    >
    {#each keyframes[file.id] as keyframe}
      <Keyframe
        {state}
        {keyframe}
        on:panmove={onKeyframePanMove.bind(null, {file, keyframe})}
        selected={currentKeyframe && keyframe.id === currentKeyframe.id}
        on:mousedown={selectKeyframe.bind(null, {file, keyframe})}
      />
    {/each}
    </Keyframes>
  </div>
{/each}
</TimelineGrid>
