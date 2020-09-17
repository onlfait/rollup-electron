<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "../Icon.svelte";
  import NumberInput from "../NumberInput.svelte";
  import MdExpandMore from 'svelte-icons/md/MdExpandMore.svelte'
  import MdExpandLess from 'svelte-icons/md/MdExpandLess.svelte'

  export let file;

  const dispatch = createEventDispatcher();

  let showAttrs = true;
  let divide = "divide-y divide-blue-600 divide-opacity-50";

  $: attrs = file && Object.keys(file.attrs);

  function onChange(file) {
    dispatch("update", file);
  }

  function toggleAttrs() {
    showAttrs = !showAttrs;
  }
</script>

{#if file}
<div
  style="min-width:150px;max-width:250px;"
  class="absolute top-0 right-0 bottom-0 bg-primary-lighter overflow-auto"
>
  <div class="p-2 truncate bg-primary">{file.name}</div>
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
        bind:value={file.attrs[name]}
        on:change={onChange.bind(null, file)} />
    </div>
    {/each}
  </div>
  {/if}
</div>
{/if}
