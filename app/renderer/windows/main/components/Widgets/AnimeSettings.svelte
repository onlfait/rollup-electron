<script>
  import Button from "../Button.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import AnimeKeyframe from "./AnimeKeyframe.svelte";

  export let props;

  let anime = props.anime;
  let keyframes = (anime && anime.keyframes) || [];

  $: {
    if (keyframes.length) {
      if (!props.anime) props.anime = {};
      props.anime.keyframes = keyframes;
    } else {
      props.anime = null;
    }
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
