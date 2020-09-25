<script>
  import Icon from "../../Icon.svelte";
  import Select from "../../Select.svelte";
  import AnimeIcon from "./AnimeIcon.svelte";
  import Panel from "./Settings/Panel.svelte";
  import Input from "./Settings/Input.svelte";

  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  import { getAnimeAttributes, getAnimeTransformations, isSameKeyframe } from "../libs/anime";

  export let animes;
  export let currentAnime = null;
  export let currentKeyframe = null;

  let info = [];
  let attributes = [];
  let transformations = [];

  $: info = currentAnime && Object.entries(currentAnime.info);
  $: attributes = currentAnime && Object.keys(currentAnime.attributes);
  $: transformations = currentKeyframe && [ "delay", ...Object.keys(currentKeyframe.props)];

  function getAttributesProps(label) {
    const { props } = getAnimeAttributes(label);
    return { ...props, value: currentAnime.attributes[label] };
  }

  function onAttributeChange(label, { currentTarget }) {
    let value = currentTarget.value.trim();
    if (!value.length) {
      currentTarget.value = currentAnime.attributes[label];
      return;
    }
    const { filter } = getAnimeAttributes(label);
    if (typeof filter === "function") {
      value = filter(value);
    }
    currentAnime.attributes[label] = value;
    animes = animes;
  }

  function deleteKeyframe() {
    currentAnime.keyframes = currentAnime.keyframes.filter(keyframe => {
      return !isSameKeyframe(currentKeyframe, keyframe);
    });
    animes = animes;
  }

  function getPropsTarget(label) {
    return label === "delay" ? currentKeyframe : currentKeyframe.props;
  }

  function getTransformationsProps(label) {
    const { props } = getAnimeTransformations(label);
    const target = getPropsTarget(label);
    return { ...props, value: target[label] };
  }

  function onTransformationsChange(label, { currentTarget }) {
    let value = currentTarget.value.trim();
    const target = getPropsTarget(label);
    if (!value.length) {
      currentTarget.value = target[label];
      return;
    }
    const { filter } = getAnimeTransformations(label);
    if (typeof filter === "function") {
      value = filter(value);
    }
    target[label] = value;
    animes = animes;
  }

  function isTransformationRemovable(label) {
    const { removable } = getAnimeTransformations(label);
    return !!removable;
  }

  function getTransformationsValues(label) {
    const { values } = getAnimeTransformations(label);
    return values;
  }

  function removeTransformation({ detail }) {
    delete currentKeyframe.props[detail];
    currentKeyframe = currentKeyframe;
    animes = animes;
  }
</script>

{#if currentAnime}
  <div class="p-2 flex space-x-2 bg-primary-dark">
    <AnimeIcon type={currentAnime.type} />
    <div class="truncate">{currentAnime.filename}</div>
  </div>
  <Panel title="Info" visible={info.length} expended={false}>
    {#each info as [label, value]}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{label}</div>
      <div>{value}</div>
    </div>
    {/each}
  </Panel>
  <Panel title="Attributes" visible={attributes.length}>
    {#each attributes as label}
    <Input
      {label}
      props={getAttributesProps(label)}
      on:change={onAttributeChange.bind(null, label)} />
    {/each}
  </Panel>
  {#if currentKeyframe}
  <Panel title="Keyframe" visible={transformations.length}>
    <div slot="title" class="p-2 cursor-pointer hover:bg-red-600" on:click|stopPropagation={deleteKeyframe}>
      <Icon icon={MdDeleteForever} />
    </div>
    {#each transformations as label}
      {#if getTransformationsValues(label)}
      <div class="p-2 flex items-center">
        <div class="flex items-center w-1/2">
          <div class="flex-1 truncate">{label}</div>
        </div>
        <div class="flex items-center w-1/2">
          <Select
            pad="px-2"
            bind:value={currentKeyframe.props[label]}
            items={getTransformationsValues(label)} />
        </div>
      </div>
      {:else}
      <Input
        {label}
        on:remove={removeTransformation}
        props={getTransformationsProps(label)}
        removable={isTransformationRemovable(label)}
        on:change={onTransformationsChange.bind(null, label)} />
      {/if}
    {/each}
  </Panel>
  {/if}
{:else}
  <div class="p-2 truncate bg-primary-dark">
    No files added...
  </div>
  <div class="p-2">
    Drop some file on the timeline ;)
  </div>
{/if}
