<script>
  import Layout from "./Editor/Layout.svelte";
  import Timeline from "./Editor/Timeline.svelte";
  import Settings from "./Editor/Settings.svelte";
  import Viewer from "./Editor/Viewer.svelte";

  import { createAnimeFromFile, getAnimeStyle } from "./libs/anime";
  import animejs from "animejs/lib/anime.es.js";
  import { debounce } from "throttle-debounce";

  let animes = [];
  let currentAnime;
  let currentKeyframe;
  let animeTimeline;

  let timeline = {
    state: { left: 0, scale: 1 },
    zoom: { min: 0.1, max: 10, sensitivity: 50 },
    splitter: { x: 200, width: 4, min: 100, max: 500 }
  };

  function onDropFiles({ detail: files }) {
    files.forEach(file => {
      createAnimeFromFile(file)
        .then(anime => {
          animes = [...animes, anime];
          if (!currentAnime) currentAnime = anime;
        })
        .catch(error => {
          console.warn("createAnimeFromFile:", error.message);
        });
    });
  }

  // $: console.log(">>> animes:", animes);
  // $: console.log(">>> timeline:", timeline);
  // $: console.log(">>> currentAnime:", currentAnime);
  // $: console.log(">>> currentKeyframe:", currentKeyframe);
  // $: console.log(">>> animeTimeline:", animeTimeline);

  function updateAnime() {
    console.log("updateAnime...");
    animeTimeline = animejs.timeline({
      autoplay: false,
      // update() {}
    });

    animes.forEach(anime => {
      const targets = `#anime-${anime.id}`;
      const $target = document.querySelector(targets);

      $target.style = getAnimeStyle(anime);

      let playables = ["sound", "video"];
      let isPlayable = playables.includes(anime.type);

      const play = () => {
        $target.volume = anime.attributes.volume;
        $target.currentTime = 0;
        $target.play();
      };
      const stop = () => {
        $target.pause();
        $target.currentTime = 0;
      };

      anime.keyframes.forEach(({ delay, props }) => {
        animeTimeline.add({ targets, ...props,
          begin() {
            isPlayable && play();
          },
          complete() {
            isPlayable && stop();
          },
          // change({ animations }) {
          //   console.log($target.volume, animations[0].currentValue);
          //   $target.volume = animations[0].currentValue;
          // }
        }, delay);
      });
    });
  }

  const updateAnimeDebounce = debounce(1000, updateAnime);

  $: if (animes.length) {
    updateAnimeDebounce();
  } else {
    animeTimeline = null;
  }
</script>

<Layout on:dropFiles={onDropFiles}>

  <div slot="leftPane" class="relative h-full overflow-hidden">
    <Viewer {animes} />
  </div>

  <div slot="rightPane" class="bg-primary-darker h-full shadow overflow-auto">
    <Settings bind:animes bind:currentAnime bind:currentKeyframe />
  </div>

  <div slot="bottomPane" class="bg-primary-darker h-full shadow">
    <Timeline
      {animeTimeline}
      bind:timeline
      bind:animes
      bind:currentAnime
      bind:currentKeyframe />
  </div>

</Layout>
