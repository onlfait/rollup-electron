<script>
  import Icon from "../../Icon.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import AnimeIcon from "./AnimeIcon.svelte";
  import Keyframe from "./Timeline/Keyframe.svelte";
  import Keyframes from "./Timeline/Keyframes.svelte";

  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  import { isSameAnime, isSameKeyframe, createKeyframe, pixelPerMs } from "../libs/anime";

  export let animes;
  export let timeline;
  export let currentAnime = null;
  export let currentKeyframe = null;

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
    keyframe.delay += getRealDelay(detail.offset);
    currentKeyframe = keyframe;
    animes = animes;
  }
</script>

<Grid bind:timeline>
  <div slot="header" class="p-2 truncate">
    Play / Pause / Replay
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
