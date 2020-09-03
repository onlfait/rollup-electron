<script>
  import Button from "../Button.svelte";
  import Select from "../Select.svelte";
  import NumberInput from "../NumberInput.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let keyframe;

  let attributesList = [
    "translateX",
    "translateY",
    "translateZ",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "perspective",
    "delay",
    "duration"
  ];

  let currentAttribute = attributesList[0];

  $: attributes = Object.entries(keyframe);

  function addAttribute() {
    if (!keyframe[currentAttribute]) {
      keyframe[currentAttribute] = 0;
    }
  }

  function removeKeyframe() {
    dispatch("remove");
  }

  function removeAttribute(label) {
    delete keyframe[label];
    keyframe = keyframe;
  }
</script>

<div class="flex space-x-2">
  <Select items={attributesList} bind:value={currentAttribute} />
  <Button icon={MdAdd} on:click={addAttribute} class="bg-primary">
    Add
  </Button>
  <Button icon={MdDelete} on:click={removeKeyframe} class="bg-red-600">
    Remove keyframe
  </Button>
</div>

{#if !attributes.length}
  No attributes...
{/if}

<div class="flex flex-col space-y-2 mt-2">
  {#each attributes as [label, value], i}
    <div class="flex flex-row space-x-2 items-center">
      <div class="flex-auto font-bold px-3">
        {label}
      </div>
      <NumberInput twoLine={false} bind:value={keyframe[label]} />
      <Button icon={MdDelete} on:click={removeAttribute.bind(null, label)} class="bg-red-600">
        Remove
      </Button>
    </div>
  {/each}
</div>
