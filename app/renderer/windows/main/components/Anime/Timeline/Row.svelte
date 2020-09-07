<script>
  import Keyframe from "./Keyframe.svelte";

  export let item;

  let rowHeight = 42;
  let col1Width = 30;
  let col2Width = 100 - col1Width;

  let keyframesElement;

  function selectKeyframe(i) {
    console.log("selectKeyframe:", item.file.name, item.keyframes[i]);
  }

  function getDelayFromEvent(event) {
    const { x } = keyframesElement.getBoundingClientRect();
    return event.clientX - x;
  }

  function addKeyframe(event) {
    const delay = getDelayFromEvent(event);
    item.keyframes = [...item.keyframes, { delay }];
    selectKeyframe(item.keyframes.length - 1);
  }
</script>

<div class="relative flex flex-col bg-primary-lighter even:bg-primary divide-y divide-purple-500">

  <div class="relative flex items-center">
    <div style="width:{col1Width}%;height:{rowHeight}px;" class="flex items-center bg-black bg-opacity-25">
      <div class="px-2 flex-auto truncate">{item.file.name}</div>
    </div>
    <div
      on:dblclick={addKeyframe}
      bind:this={keyframesElement}
      style="width:{col2Width}%;height:{rowHeight}px;"
      class="flex items-center whitespace-no-wrap px-2"
    >
      {#each item.keyframes as keyframe, i}
        <Keyframe bind:keyframe on:click={selectKeyframe.bind(null, i)} />
      {/each}
    </div>
  </div>

</div>
