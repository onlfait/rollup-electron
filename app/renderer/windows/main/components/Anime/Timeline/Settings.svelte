<script>
  import pannable from "../../pannable.js";
  import { transformProps } from "../utils";
  import Select from "../../Select.svelte";
  import Button from "../../Button.svelte";
  import NumberInput from "../../NumberInput.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdDelete from "svelte-icons/md/MdDelete.svelte";

  export let state;

  let top = 8;
  let right = 8;
  let minHeight = 152;
  let height = minHeight;

  let element;

  let propsList = Object.keys(transformProps);
  let selectedProp = propsList[0];

  $: transformKeys = state.selectedKeyframe ? Object.keys(state.selectedKeyframe.props) : [];

  function hasProp(name) {
    return state.selectedKeyframe.props[name] !== undefined;
  }

  function addTransformProp() {
    if (!hasProp(selectedProp)) {
      state.selectedKeyframe.props[selectedProp] = 0;
    }
  }

  function removeTransformProp(name) {
    if (hasProp(name)) {
      delete state.selectedKeyframe.props[name];
      state.selectedKeyframe.props = state.selectedKeyframe.props;
    }
  }

  function onPanResize({ detail }) {
    const { top } = element.getBoundingClientRect();
    const maxHeight = window.innerHeight - top - 8;
    height = Math.max(minHeight, Math.min(maxHeight, height + detail.dy));
  }

  function onPanMove({ detail }) {
    const bbox = element.getBoundingClientRect();
    const maxTop = window.innerHeight - bbox.height - 40;
    const maxRight = window.innerWidth - bbox.width - 8;
    top = Math.max(8, Math.min(maxTop, top + detail.dy));
    right = Math.max(8, Math.min(maxRight, right - detail.dx));
  }
</script>

{#if state.selectedKeyframe}

<div
  bind:this={element}
  style="top:{top}px;right:{right}px;height:{height}px;"
  class="absolute flex flex-col z-50 h-full bg-primary rounded shadow"
>

  <div
    use:pannable
    on:panmove={onPanMove}
    class="p-2 bg-primary-darker cursor-move select-none rounded-t"
  >
      <div class="text-sm opacity-75">
        {state.selectedKeyframe.id}
      </div>
  </div>

  {#if state.selectedKeyframe}

  <div class="p-2 flex space-x-2">
    <Select items={propsList} bind:value={selectedProp} />
    <Button icon={MdAdd} on:click={addTransformProp} class="bg-green-600">
      Add
    </Button>
  </div>

  <div class="flex flex-auto flex-col divide-y divide-blue-600 divide-opacity-50 overflow-auto">
    {#each transformKeys as name}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{name}</div>
      <NumberInput twoLine={false} bind:value={state.selectedKeyframe.props[name]} {...transformProps[name]} />
      {#if transformProps[name].removable}
      <Button icon={MdDelete} on:click={removeTransformProp.bind(null, name)} class="bg-red-600" />
      {/if}
    </div>
    {/each}
  </div>

  {/if}

  <div
    use:pannable
    on:panmove={onPanResize}
    on:mousedown|stopPropagation
    class="absolute w-full h-1 bottom-0 select-none"
    style="cursor:ns-resize"
  ></div>

</div>

{/if}
