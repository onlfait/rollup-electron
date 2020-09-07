<script>
  // import Button from "../Button.svelte";
  import Select from "./AttrSelect.svelte";
  // import NumberInput from "../NumberInput.svelte";
  // import MdAdd from "svelte-icons/md/MdAdd.svelte";
  // import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  export let item;

  let col1Width = 30;
  let col2Width = 70;

  let collapsed = true;

  function toggle() {
    collapsed = !collapsed;
  }

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

  function addAttribute() {
    if (item.attributes.includes(currentAttribute)) return;
    item.attributes = [...item.attributes, currentAttribute];
  }

  function disabledAttr(attr, value) {
    return attr === value || item.attributes.includes(attr);
  }
</script>

<div class="relative flex flex-col bg-primary-lighter even:bg-primary">

  <div class="relative flex items-center">
    <div style="width:{col1Width}%;height:42px;" class="flex items-center bg-black bg-opacity-25">
      <div class="px-2 flex-auto truncate">{item.file.name}</div>
      <div class="px-4 cursor-pointer" on:click={toggle}>⁝</div>
    </div>
    <div style="width:{col2Width}%;height:42px;" class="flex items-center whitespace-no-wrap">
      <div class="px-2">...</div>
    </div>
  </div>

  {#if !collapsed}

  {#each item.attributes as attr}
  <div class="relative flex items-center">
    <div style="width:{col1Width}%;height:42px;" class="flex items-center bg-black bg-opacity-25">
      <div class="px-2 flex-auto">{attr}</div>
    </div>
    <div style="width:{col2Width}%;height:42px;" class="flex items-center whitespace-no-wrap">
      <div class="px-2">...</div>
    </div>
  </div>
  {/each}

  <div class="relative flex items-center">
    <div style="width:{col1Width}%;height:42px;" class="flex items-center bg-black bg-opacity-25">
      <div class="px-2 flex flex-auto">
        <Select items={attributesList} bind:value={currentAttribute} disabled={disabledAttr} />
      </div>
      <div class="px-3 cursor-pointer" on:click={addAttribute}>+</div>
    </div>
    <div style="width:{col2Width}%;height:42px;" class="flex items-center whitespace-no-wrap">
      <div class="px-2">...</div>
    </div>
  </div>

  {/if}

</div>
