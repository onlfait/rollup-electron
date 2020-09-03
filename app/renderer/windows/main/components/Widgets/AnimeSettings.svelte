<script>
  import Button from "../Button.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import AnimeKeyframe from "./AnimeKeyframe.svelte";
  import animejs from "animejs/lib/anime.es.js";
  import { createEventDispatcher } from "svelte";

  export let props;

  let duration = 0;
  let anime = props.anime;
  let keyframes = (anime && anime.keyframes) || [];
  let div = document.createElement("div");
  let dispatch = createEventDispatcher();

  $: {
    if (keyframes.length) {
      if (!props.anime) props.anime = {};
      props.anime.keyframes = keyframes;
      duration = animejs({
        targets: div,
        ...props.anime,
        autoplay: false
      }).duration;
      dispatch("duration", duration);
    } else {
      props.anime = null;
      dispatch("duration", -1);
    }
  }

  $: if (duration) {
    props.duration = duration;
  }

  function addKeyframe() {
    keyframes = [ ...keyframes, {} ];
  }

  function removeKeyframe(index) {
    keyframes = keyframes.filter((keyframe, i) => index !== i);
  }
</script>

<div class="p-2 bg-secondary-lighter rounded">
  <Button icon={MdAdd} on:click={addKeyframe} class="bg-primary">
    Add keyframe
  </Button>

  {#each keyframes as keyframe, i }
  <div class="p-2 flex flex-col bg-light mt-2">
    <AnimeKeyframe bind:keyframe on:remove={removeKeyframe.bind(null, i)} />
  </div>
  {/each}
</div>
