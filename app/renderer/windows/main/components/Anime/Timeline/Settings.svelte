<script>
  import NumberInput from "../../NumberInput.svelte";

  export let state;
</script>

<div class="absolute z-50 bg-primary" style="top:8px;right:8px;">

  <div class="p-2 bg-primary-darker">
    {#if state.selectedKeyframe}
      Key: {state.selectedKeyframe.id}
    {:else}
      No keyframe selected...
    {/if}
  </div>

  {#if state.selectedKeyframe}
  <div class="p-2">
    <NumberInput
      step={100}
      label="Delay"
      twoLine={false}
      bind:value={state.selectedKeyframe.props.delay}
    />
  </div>
  {/if}

</div>
