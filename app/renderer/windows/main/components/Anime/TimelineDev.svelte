<script>
  import TimelineEditor from "./TimelineEditor.svelte";

  let animes = [];
  let visible = true;

  function close() {
    visible = false;
  }

  $: console.log(">>> animes:", animes);
</script>

{#if visible}
<TimelineEditor bind:animes on:close={close} />
{/if}
