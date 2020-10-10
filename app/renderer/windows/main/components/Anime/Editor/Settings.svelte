<script>
  import { getContext } from "svelte";
  import AnimeIcon from "./AnimeIcon.svelte";
  import Section from "./Settings/Section.svelte";
  import InfoPanel from "./Settings/Panels/Info.svelte";
  import AttrsPanel from "./Settings/Panels/Attrs.svelte";
  import StylePanel from "./Settings/Panels/Style.svelte";
  import TransPanel from "./Settings/Panels/Trans.svelte";
  import Keyframe from "./Settings/Keyframe.svelte";

  import Icon from "../../Icon.svelte";
  import MdAdjust from "svelte-icons/md/MdAdjust.svelte";

  const { items, selectedItem, selectedKeyframe } = getContext("Editor");

  $: info = $selectedItem ? Object.entries($selectedItem.target.info) : [];
  $: attrs = $selectedItem ? Object.entries($selectedItem.target.attrs) : [];
  $: style = $selectedItem ? Object.entries($selectedItem.target.style) : [];
  $: trans = $selectedItem ? Object.entries($selectedItem.target.trans) : [];

  function onChange(type, { detail }) {
    const { key, value } = detail;
    // TODO check value, min, max, etc...
    $selectedItem.target[type][key] = value;
    $items = $items;
  }

  function onRemove(type, { detail }) {
    const { key } = detail;
    delete $selectedItem.target[type][key];
    $selectedItem = $selectedItem;
    $items = $items;
  }
</script>

{#if $selectedItem}
  <Section>
    <div slot="title" class="flex items-center space-x-2 flex-auto">
      <AnimeIcon type={$selectedItem.target.type} />
      <div class="p-2 pl-0 truncate flex-auto">{$selectedItem.target.name}</div>
    </div>
    <InfoPanel {info} />
    <AttrsPanel {attrs} on:change={onChange.bind(null, "attrs")} />
    <StylePanel {style} on:change={onChange.bind(null, "style")} />
    <TransPanel {trans}
      on:change={onChange.bind(null, "trans")}
      on:remove={onRemove.bind(null, "trans")} />
  </Section>
  <Section visible={$selectedKeyframe}>
    <div slot="title" class="flex items-center space-x-2 flex-auto">
      <Icon icon={MdAdjust} class="w-4 h-4 flex-shrink-0" />
      <div class="p-2 pl-0 flex-1 truncate">Keyframe</div>
    </div>
    <div class="p-2 flex items-center">
      <div class="truncate w-1/2">identifier</div>
      <div class="truncate w-1/2">{$selectedKeyframe.id}</div>
    </div>
    <Keyframe />
  </Section>
{:else if $items.length}
  <div class="p-2 truncate bg-primary-dark">
    No file selected...
  </div>
{:else}
  <div class="p-2 truncate bg-primary-dark">
    No files added...
  </div>
  <div class="p-2">
    Drop some file on the timeline ;)
  </div>
{/if}
