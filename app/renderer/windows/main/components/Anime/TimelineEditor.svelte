<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  import Button from "../Button.svelte";
  import Timeline from "./Timeline.svelte";
  import Splitter from "../Splitter.svelte";
  import Settings from "./Timeline/Settings.svelte";
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";
  import MdArrowBack from "svelte-icons/md/MdArrowBack.svelte";

  import animejs from "animejs/lib/anime.es.js";
  import { throttle } from "throttle-debounce";

  export let animes;

  let element;
  let timeline;

  const dispatch = createEventDispatcher();

  let state = {
    left: 0,
    scale: 1,
    selectedAnime: null,
    selectedKeyframe: null
  };

  let position = "absolute z-20 left-0 right-0 bottom-0";
  let theme = "bg-light text-dark dark:bg-dark dark:text-light";

  onMount(() => {
    document.body.append(element);
  });

  function close() {
    dispatch("close");
  }

  let slider;
  let duration = 0;

  function makeAnime() {
    timeline = animejs.timeline({
      autoplay: false,
      update() {
        console.log(timeline.duration/100*timeline.progress);
        slider.value = timeline.duration/100*timeline.progress;
      }
    });
    animes.forEach(anime => {
      if (anime.target.type === "image") {
        const targets = `#anime-${anime.id}`;
        const keyframes = anime.keyframes.map(keyframe => keyframe.props);
        // timeline.add({ targets, keyframes }, 0);
        keyframes.forEach(keyframe => {
          const { delay, ...props } = keyframe;
          timeline.add({ targets,...anime.target.attrs, ...props }, delay);
        });
      }
    });
    duration = timeline.duration;
    console.log({duration});
  }

  const makeAnimeThrottle = throttle(500, makeAnime);

  function play() {
    // makeAnime();
    // timeline.seek(0);
    timeline.restart();
  }

  // function getStyle(attrs) {
  //   let ret = "";
  //   Object.entries(attrs).forEach(([key, value]) => {
  //     ret += `${key}:${value}px;`;
  //   });
  //   return ret + "transform: translate(0,0,0) rotate(0);";
  // }

  function onSeek(event) {
    timeline.seek(event.target.value);
  }

  $: if (animes) makeAnimeThrottle();
</script>

<div bind:this={element} class="{position} {theme}" style="top:32px">
  <Splitter save="timeline.main" sizes={[75,25]} flex="col" class="relative">
    <div slot="a" class="flex">
      <div class="absolute inset-0 overflow-hidden">
      {#each animes as anime}
        {#if anime.target.type === "image"}
        <img
          class="absolute"
          id="anime-{anime.id}"
          src="/public/media/images/{anime.target.file}" alt={anime.id}
        />
        {/if}
      {/each}
      </div>
      <div class="absolute p-2 flex items-center space-x-2">
        <Button class="bg-primary" icon={MdArrowBack} on:click={close}>
          Back
        </Button>
        {#if animes.length}
        <Button class="bg-green-600" icon={MdPlayArrow} on:click={play}>
          Play
        </Button>
        <input bind:this={slider} type="range" value={0} min={0} max={duration} on:input={onSeek} />
        {/if}
        <div>
          Objects: {animes.length}
        </div>
      </div>
    </div>
    <div slot="b" class="relative h-full">
      <Timeline bind:animes bind:state />
    </div>
  </Splitter>

  <Settings bind:state />
</div>
