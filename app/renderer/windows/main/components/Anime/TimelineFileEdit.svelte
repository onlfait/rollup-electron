<script>
  import { createEventDispatcher } from "svelte";
  import { getInputProps, getAnimeIcon, animeProps } from "./utils";

  import Icon from "../Icon.svelte";
  import Select from "../Select.svelte";
  import Button from "../Button.svelte";
  import InputText from "../NumberInput.svelte";
  import NumberInput from "../NumberInput.svelte";

  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdDelete from "svelte-icons/md/MdDelete.svelte";
  import MdExpandMore from "svelte-icons/md/MdExpandMore.svelte";
  import MdExpandLess from "svelte-icons/md/MdExpandLess.svelte";

  export let currentFile;
  export let currentKeyframe;

  const dispatch = createEventDispatcher();

  let showAttrs = true;
  let showProps = true;
  let divide = "divide-y divide-blue-600 divide-opacity-50";

  let attrs;
  let props;
  let inputProps;
  let selectedProp = null;
  let inputPropsKeys = [];

  $: if (currentFile) {
    selectedProp = null;
    attrs = Object.keys(currentFile.attrs);
    inputProps = getInputProps(currentFile.type);
  }

  $: if (currentKeyframe) {
    props = Object.keys(currentKeyframe.props);
    inputPropsKeys = Object.keys(inputProps).filter(prop => {
      return !props.includes(prop);
    });
    selectedProp = selectedProp || inputPropsKeys[0];
  }

  function onAttrsChange(file) {
    dispatch("updateFile", file);
  }

  function onKeyframeChange(keyframe) {
    dispatch("updateKeyframe", keyframe);
  }

  function deleteKeyframe(event) {
    event.stopPropagation();
    dispatch("deleteKeyframe", currentKeyframe);
  }

  function toggleAttrs() {
    showAttrs = !showAttrs;
  }

  function toggleProps() {
    showProps = !showProps;
  }

  function hasProp(name) {
    return currentKeyframe.props[name] !== undefined;
  }

  function addTransformProp() {
    if (selectedProp && !hasProp(selectedProp)) {
      currentKeyframe.props[selectedProp] = 0;
      selectedProp = inputPropsKeys[1];
    }
  }

  function deleteKeyframeProp(name) {
    delete currentKeyframe.props[name];
    currentKeyframe = currentKeyframe;
    dispatch("updateKeyframe", currentKeyframe);
  }
</script>

{#if currentFile}
<div
  style="min-width:150px;max-width:250px;"
  class="absolute z-50 top-0 right-0 bottom-0 bg-primary-lighter overflow-auto"
>
  <div class="flex items-center space-x-2 p-2 bg-primary">
    <Icon icon={getAnimeIcon(currentFile.type)} class="w-4 h-4 flex-shrink-0" />
    <div class="truncate">
      {currentFile.name}
    </div>
  </div>

  <div class="p-2 truncate bg-primary-light flex space-x-2 cursor-pointer" on:click={toggleAttrs}>
    <Icon icon={showAttrs ? MdExpandLess : MdExpandMore} />
    <div>Attributes</div>
  </div>

  {#if showAttrs}
  <div class="{divide}">
    {#each attrs as name}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{name}</div>
      <NumberInput
        pad="px-2"
        twoLine={false}
        {...animeProps[name]}
        bind:value={currentFile.attrs[name]}
        on:change={onAttrsChange.bind(null, currentFile)} />
    </div>
    {/each}
  </div>
  {/if}

  {#if currentKeyframe}
  <div class="p-2 truncate bg-primary-light flex space-x-2 cursor-pointer" on:click={toggleProps}>
    <Icon icon={showProps ? MdExpandLess : MdExpandMore} />
    <div class="flex-auto">Keyframe</div>
    <Icon icon={MdDelete} class="hover:text-red-500" on:click={deleteKeyframe} />
  </div>

  {#if showProps}
  <div class="{divide}">

    {#if inputPropsKeys.length}
    <div class="p-2 flex space-x-2">
      <Select pad="px-2" items={inputPropsKeys} bind:value={selectedProp} />
      <Button pad="px-2" icon={MdAdd} on:click={addTransformProp} class="bg-green-600">
        Add
      </Button>
    </div>
    {/if}

    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">delay</div>
      <NumberInput
        min={0}
        step={100}
        pad="px-2"
        twoLine={false}
        bind:value={currentKeyframe.delay}
        on:change={onKeyframeChange.bind(null, currentKeyframe)} />
    </div>
    {#each props as name}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{name}</div>
      {#if inputProps[name].removable}
      <Icon
        icon={MdDelete}
        class="hover:text-red-500"
        on:click={deleteKeyframeProp.bind(null, name)}
        />
      {/if}
      {#if inputProps[name].type && inputProps[name].type === 'text'}
      caca
      <InputText
        pad="px-2"
        {...inputProps[name]}
        bind:value={currentKeyframe.props[name]}
        on:change={onKeyframeChange.bind(null, currentKeyframe)}
      />
      {:else}
      <NumberInput
        pad="px-2"
        twoLine={false}
        {...inputProps[name]}
        bind:value={currentKeyframe.props[name]}
        on:change={onKeyframeChange.bind(null, currentKeyframe)}
      />
      {/if}


    </div>
    {/each}
  </div>
  {/if}

  {/if}

</div>
{/if}
