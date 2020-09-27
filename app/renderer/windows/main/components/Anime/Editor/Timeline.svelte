<script>
  import Icon from "../../Icon.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import AnimeIcon from "./AnimeIcon.svelte";
  import Keyframe from "./Timeline/Keyframe.svelte";
  import Keyframes from "./Timeline/Keyframes.svelte";

  import MdPause from "svelte-icons/md/MdPause.svelte";
  import MdReplay from "svelte-icons/md/MdReplay.svelte";
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  import { isSameAnime, isSameKeyframe, createKeyframe, pixelPerMs } from "../libs/anime";

  export let animes;
  export let timeline;
  export let currentAnime = null;
  export let currentKeyframe = null;
  export let animeTimeline = null;

  function selectAnime(anime) {
    if (isSameAnime(currentAnime, anime)) return;
    currentKeyframe = null;
    currentAnime = anime;
  }

  function selectedClass(currentAnime, anime) {
    return isSameAnime(currentAnime, anime) ? "bg-black bg-opacity-25" : "";
  }

  function deleteAnime(anime) {
    if (isSameAnime(currentAnime, anime)) {
      currentKeyframe = null;
      currentAnime = null;
    }
    animes = animes.filter(a => !isSameAnime(a, anime));
  }

  function selectKeyframe(keyframe, event) {
    if (isSameKeyframe(currentKeyframe, keyframe)) return;
    if (event) {
      currentAnime = animes.find(anime => {
        return anime.keyframes.find(k => isSameKeyframe(k, keyframe));
      });
    }
    currentKeyframe = keyframe;
  }

  function getRealDelay(delay) {
    return Math.round(delay * pixelPerMs);
  }

  function addKeyframe({ detail }) {
    const keyframe = createKeyframe({ delay: getRealDelay(detail.offset) });
    currentAnime.keyframes = [ ...currentAnime.keyframes, keyframe ];
    selectKeyframe(keyframe);
    animes = animes;
  }

  function moveKeyframe(keyframe, { detail }) {
    const delay = keyframe.delay + getRealDelay(detail.offset);
    keyframe.delay = Math.max(0, delay);
    currentKeyframe = keyframe;
    animes = animes;
  }

  function playAnime() {
    animeTimeline && animeTimeline.play();
  }

  function restartAnime() {
    animeTimeline && animeTimeline.restart();
  }

  function pauseAnime() {
    animeTimeline && animeTimeline.pause();
  }

  let iconClass = "w-4 h-4 flex-shrink-0 cursor-pointer hover:text-blue-500";
</script>

<Grid bind:timeline>
  <div slot="header" class="p-2 flex splace-x-2 truncate">
    <Icon class={iconClass} icon={MdReplay} on:click={restartAnime} />
    <Icon class={iconClass} icon={MdPlayArrow} on:click={playAnime} />
    <Icon class={iconClass} icon={MdPause} on:click={pauseAnime} />
  </div>
  <div slot="header" class="p-2 truncate">
    Timeline...
  </div>
  {#each animes as anime}
    <div
      on:mousedown={selectAnime.bind(null, anime)}
      class="flex pl-2 items-center space-x-2 {selectedClass(currentAnime, anime)}"
    >
      <AnimeIcon type={anime.type} />
      <div class="p-2 truncate flex-1">{anime.filename}</div>
      <div
        on:mousedown|stopPropagation
        class="p-2 cursor-pointer hover:bg-red-600"
        on:click|stopPropagation={deleteAnime.bind(null, anime)}>
        <Icon icon={MdDeleteForever} />
      </div>
    </div>
    <div
      on:mousedown={selectAnime.bind(null, anime)}
      class="overflow-hidden {selectedClass(currentAnime, anime)}"
    >
      <Keyframes bind:timeline on:add={addKeyframe}>
        {#each anime.keyframes as keyframe}
        <Keyframe
          {timeline}
          {keyframe}
          on:move={moveKeyframe.bind(null, keyframe)}
          on:mousedown={selectKeyframe.bind(null, keyframe)}
          selected={isSameKeyframe(currentKeyframe, keyframe)} />
        {/each}
      </Keyframes>
    </div>
  {/each}
</Grid>
