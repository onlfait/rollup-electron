<script>
  import Icon from "../Icon.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import Keyframe from "./Timeline/Keyframe.svelte";
  import Keyframes from "./Timeline/Keyframes.svelte";
  import {
    hasSameId,
    animeTypes,
    animeAttrs,
    animeIcons,
    getFileExt,
    pixelPerMs,
    animeFactory,
    keyframeFactory
  } from "./utils";

  export let animes;
  export let state;

  function updateState(props) {
    state = { ...state, ...props };
  }

  function addAnime(target) {
    animes = [ ...animes, animeFactory(target) ];
  }

  function getImageSize(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = `/public/media/images/${src}`;
    });
  }

  function addAnimeFromFile(file) {
    const ext = getFileExt(file);
    const type = animeTypes[ext];

    if (!type) {
      // TODO notify user
      return console.warn(`WARN >>> Unsupported extension "${ext}"`);
    }

    app.remote.call(`upload.${type}`, file.path)
      .then(async filename => {
        const label = filename;
        const attrs = { ...animeAttrs[type] };
        const { width, height } = await getImageSize(filename);
        addAnime({ type, label, file: filename, attrs: { ...attrs, width, height } });
      })
      .catch(error => console.warn("WARN >>>", error));
  }

  function onDrop({ detail }) {
    detail.forEach(addAnimeFromFile);
  }

  function onPanMove({ detail }) {
    updateState({ left: detail.x });
  }

  function addKeyframe(anime, props) {
    const keyframe = keyframeFactory(props);
    anime.keyframes = [ ...anime.keyframes, keyframe ];
    animes = animes;
    return keyframe;
  }

  function selectKeyframe(selectedAnime, selectedKeyframe) {
    updateState({ selectedAnime, selectedKeyframe });
  }

  function clampDelay(delay) {
    return Math.max(0, parseInt(delay));
  }

  function onDoubleClick(anime, { detail }) {
    const delay = clampDelay(detail.x / state.scale * pixelPerMs);
    const keyframe = addKeyframe(anime, { delay });
    selectKeyframe(anime, keyframe);
  }

  function onKeyframeMove(anime, keyframe, { detail }) {
    const delay = keyframe.props.delay + detail.dx * pixelPerMs / state.scale;
    keyframe.props.delay = clampDelay(delay);
    updateState({ selectedKeyframe: keyframe });
    animes = animes;
  }

  function updateAnime(anime) {
    animes = animes.map(a => hasSameId(a, anime) ? { ...a, ...anime } : a);
  }

  $: if (state.selectedAnime) {
    updateAnime(state.selectedAnime);
  }
</script>

<Grid bind:state on:drop={onDrop}>
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
        {state}
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
