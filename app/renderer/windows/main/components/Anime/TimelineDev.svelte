<script>
  import TimelineModal from "./TimelineModal.svelte";

  let timeline = [];

  // $: console.log("> timeline:", timeline);
</script>

<TimelineModal bind:timeline />
