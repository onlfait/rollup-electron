<script>
  import Icon from "../Icon.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import Settings from "./Timeline/Settings.svelte";
  import Keyframe from "./Timeline/Keyframe.svelte";
  import Keyframes from "./Timeline/Keyframes.svelte";
  import {
    hasSameId,
    animeTypes,
    animeAttrs,
    animeIcons,
    getFileExt,
    animeFactory,
    keyframeFactory
  } from "./utils";

  export let animes;

  let state = {
    left: 0,
    selectedAnime: null,
    selectedKeyframe: null
  };

  function updateState(props) {
    state = { ...state, ...props };
    // console.log("updateState", state);
  }

  function addAnime(target) {
    animes = [ ...animes, animeFactory(target) ];
  }

  function addAnimeFromFile(file) {
    const ext = getFileExt(file);
    const type = animeTypes[ext];

    if (!type) {
      // TODO notify user
      return console.warn(`WARN >>> Unsupported extension "${ext}"`);
    }

    const label = file.name;
    const attrs = { ...animeAttrs[type] };

    addAnime({ type, label, file, attrs });
  }

  function onDrop({ detail }) {
    detail.forEach(addAnimeFromFile);
  }

  function onPanMove({ detail }) {
    updateState({ left: detail.x });
  }

  function addKeyframe(anime, x) {
    const keyframe = keyframeFactory({ x });
    anime.keyframes = [ ...anime.keyframes, keyframe ];
    animes = animes;
    return keyframe;
  }

  function selectKeyframe(selectedAnime, selectedKeyframe) {
    updateState({ selectedAnime, selectedKeyframe });
  }

  function onDoubleClick(anime, { detail }) {
    const keyframe = addKeyframe(anime, detail.x);
    selectKeyframe(anime, keyframe);
  }

  function onKeyframeMove(anime, keyframe, { detail }) {
    keyframe.x = Math.max(0, keyframe.x + detail.dx);
    updateState({ selectedKeyframe: keyframe });
    animes = animes;
  }

  function onSettingsUpdate({ detail }) {
    const { anime } = detail;
    animes = animes.map(a => hasSameId(a, anime) ? { ...a, ...anime } : a);
  }
</script>

<Settings {state} on:update={onSettingsUpdate} />

<Grid on:drop={onDrop}>
{#each animes as anime, i}
  <div class="flex bg-{i%2}">
    <Icon icon={animeIcons[anime.target.type]} class="m-2 mr-0 w-4 h-4 flex-shrink-0" />
    <div class="p-2 flex-auto truncate">{anime.target.label}</div>
    <div class="py-2 px-4 cursor-pointer hover:bg-blue-500">⁝</div>
  </div>
  <div class="px-2 overflow-hidden bg-{i%2}">
    <Keyframes
      left={state.left}
      on:panmove={onPanMove}
      on:dblclick={onDoubleClick.bind(null, anime)}
    >
    {#each anime.keyframes as keyframe}
      <Keyframe
        {keyframe}
        selected={hasSameId(keyframe, state.selectedKeyframe)}
        on:panmove={onKeyframeMove.bind(null, anime, keyframe)}
        on:mousedown={selectKeyframe.bind(null, anime, keyframe)}
      />
    {/each}
    </Keyframes>
  </div>
{/each}
</Grid>
