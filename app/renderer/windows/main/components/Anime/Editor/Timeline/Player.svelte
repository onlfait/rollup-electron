<script>
  import Icon from "../../../Icon.svelte";
  import MdPause from "svelte-icons/md/MdPause.svelte";
  import MdReplay from "svelte-icons/md/MdReplay.svelte";
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";

  export let timeline = null;

  function playAnime() {
    timeline && timeline.play();
  }

  function restartAnime() {
    timeline && timeline.restart();
  }

  function pauseAnime() {
    timeline && timeline.pause();
  }

  let iconClass = "w-4 h-4 flex-shrink-0 cursor-pointer hover:text-blue-500";
</script>

<Icon class={iconClass} icon={MdReplay} on:click={restartAnime} />
<Icon class={iconClass} icon={MdPlayArrow} on:click={playAnime} />
<Icon class={iconClass} icon={MdPause} on:click={pauseAnime} />
