<script>
  import TimelineEditor from "./TimelineEditor.svelte";

  let animes = [];

  $: console.log(">>> animes:", animes);
</script>

<TimelineEditor bind:animes />
