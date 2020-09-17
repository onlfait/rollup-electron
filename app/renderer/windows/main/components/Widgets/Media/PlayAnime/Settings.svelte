<script>
  import Button from "../../../Button.svelte";
  // import AnimeTimeline from "../../../Anime/Timeline.svelte";

  export let widget;
  export let props;

  let opened = false;

  const open = () => (opened = true);
  const close = () => (opened = false);
</script>

<div id="widget-{widget.id}" >
  <Button class="bg-primary flex-auto justify-center" on:click={open}>
    open animation timeline
  </Button>
</div>

{#if opened}
<!-- <AnimeTimeline bind:timeline={props.timeline} on:close={close} /> -->
{/if}
