<script>
  import TimelineModal from "./TimelineModal.svelte";

  export let timeline = [];

  $: console.log("timeline:", timeline);
</script>

<TimelineModal bind:timeline />
