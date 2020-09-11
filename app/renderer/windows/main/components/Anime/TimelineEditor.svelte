<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  import Button from "../Button.svelte";
  import Timeline from "./Timeline.svelte";
  import Splitter from "../Splitter.svelte";
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";
  import MdArrowBack from "svelte-icons/md/MdArrowBack.svelte";

  import animejs from "animejs/lib/anime.es.js";

  export let animes;

  let element;

  const dispatch = createEventDispatcher();

  let position = "absolute z-20 left-0 right-0 bottom-0";
  let theme = "bg-light text-dark dark:bg-dark dark:text-light";

  onMount(() => {
    document.body.append(element);
  });

  function close() {
    dispatch("close");
  }

  function createImageTarget(target) {
    const $e = document.createElement("img");
    const { top, left, width, height } = target.attrs;
    $e.style.top = top;
    $e.style.left = left;
    $e.style.zIndex = 40;
    $e.style.display = "none";
    $e.style.position = "absolute";
    width > 0 && $e.setAttribute("width", width);
    height > 0 && $e.setAttribute("height", height);
    $e.setAttribute("src", `/public/media/images/${target.file}`);
    return $e;
  }

  function play() {
    console.log("Play anime...");
    const timeline = animejs.timeline();
    animes.forEach(anime => {
      if (anime.target.type === "image") {
        const targets = createImageTarget(anime.target);
        const keyframes = anime.keyframes.map(keyframe => keyframe.props);
        timeline.add({ targets, keyframes,
          begin() {
            targets.style.display = "block";
          },
          complete() {
            targets.remove();
          }
        });
        document.body.append(targets);
      }
    });
    timeline.play();
  }
</script>

<div bind:this={element} class="{position} {theme}" style="top:32px">
  <Splitter save="timeline.main" sizes={[75,25]} flex="col" class="relative">
    <div slot="a" class="p-2 flex items-center space-x-2">
        <Button class="bg-primary" icon={MdArrowBack} on:click={close}>
          Back
        </Button>
        {#if animes.length}
        <Button class="bg-green-600" icon={MdPlayArrow} on:click={play}>
          Play
        </Button>
        {/if}
        <div>
          Objects: {animes.length}
        </div>
    </div>
    <div slot="b" class="h-full">
      <Timeline bind:animes />
    </div>
  </Splitter>
</div>
