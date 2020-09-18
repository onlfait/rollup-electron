<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "../Icon.svelte";
  import NumberInput from "../NumberInput.svelte";
  import MdExpandMore from "svelte-icons/md/MdExpandMore.svelte";
  import MdExpandLess from "svelte-icons/md/MdExpandLess.svelte";

  export let currentFile;
  export let currentKeyframe;

  const dispatch = createEventDispatcher();

  let showAttrs = true;
  let showProps = true;
  let divide = "divide-y divide-blue-600 divide-opacity-50";

  $: attrs = currentFile && Object.keys(currentFile.attrs);

  function onAttrsChange(file) {
    dispatch("updateFile", file);
  }

  function onKeyframeChange(keyframe) {
    dispatch("updateKeyframe", keyframe);
  }

  function toggleAttrs() {
    showAttrs = !showAttrs;
  }

  function toggleProps() {
    showProps = !showProps;
  }
</script>

{#if currentFile}
<div
  style="min-width:150px;max-width:250px;"
  class="absolute top-0 right-0 bottom-0 bg-primary-lighter overflow-auto"
>
  <div class="p-2 truncate bg-primary">{currentFile.name}</div>

  <div class="p-2 truncate bg-primary-light flex cursor-pointer" on:click={toggleAttrs}>
    <Icon icon={showAttrs ? MdExpandLess : MdExpandMore} />
    Attributes
  </div>

  {#if showAttrs}
  <div class="{divide}">
    {#each attrs as name}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{name}</div>
      <NumberInput
        pad="px-2"
        twoLine={false}
        bind:value={currentFile.attrs[name]}
        on:change={onAttrsChange.bind(null, currentFile)} />
    </div>
    {/each}
  </div>
  {/if}

  {#if currentKeyframe}
  <div class="p-2 truncate bg-primary-light flex cursor-pointer" on:click={toggleProps}>
    <Icon icon={showProps ? MdExpandLess : MdExpandMore} />
    Keyframe
  </div>

  {#if showProps}
  <div class="{divide}">
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">delay</div>
      <NumberInput
        pad="px-2"
        twoLine={false}
        bind:value={currentKeyframe.delay}
        on:change={onKeyframeChange.bind(null, currentKeyframe)} />
    </div>
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">duration</div>
      <NumberInput
        pad="px-2"
        twoLine={false}
        bind:value={currentKeyframe.props.duration}
        on:change={onKeyframeChange.bind(null, currentKeyframe)} />
    </div>
  </div>
  {/if}

  {/if}

</div>
{/if}
