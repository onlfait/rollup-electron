<script>
  import NumberInput from "../../NumberInput.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let state;

  $: anime = state.selectedAnime;
  $: keyframe = state.selectedKeyframe;
  $: delay = keyframe ? keyframe.x / 100 : 0;

  function onDelayUpdate(event) {
    keyframe.x = event.target.value * 100;
    dispatch("update", { anime, keyframe });
  }
</script>

<div class="absolute z-50 bg-primary" style="top:8px;right:8px;">

  <div class="p-2 bg-primary-darker">
    {#if keyframe}
      Key: {keyframe.id}
    {:else}
      No keyframe selected...
    {/if}
  </div>

  {#if keyframe}
  <div class="p-2">
    <NumberInput
      step={0.01}
      label="Delay"
      twoLine={false}
      value={delay}
      on:input={onDelayUpdate}
    />
  </div>
  {/if}

</div>
