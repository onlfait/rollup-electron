<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  import Button from "../Button.svelte";
  import Splitter from "../Splitter.svelte";
  import MdArrowBack from "svelte-icons/md/MdArrowBack.svelte";

  const dispatch = createEventDispatcher();

  let element;

  let style = "top:32px";
  let position = "flex flex-col absolute z-10 left-0 right-0 bottom-0";
  let theme = "bg-light text-dark dark:bg-dark dark:text-light";

  onMount(() => {
    document.body.append(element);
  });

  function close() {
    dispatch("close");
  }

  function onDrop(event) {
    event.preventDefault();
    dispatch("files", [...event.dataTransfer.files]);
  }
</script>

<div
  bind:this={element}
  class="{position} {theme}"
  {style}
  on:drop={onDrop}
  on:dragover|preventDefault>
  <div class="flex p-2 space-x-2 items-center bg-primary bg-opacity-50">
    <Button class="bg-primary" icon={MdArrowBack} on:click={close}>
      Back
    </Button>
    <slot name="topbar" />
  </div>
  <Splitter save="timeline.main" sizes={[75,25]} flex="col" class="relative">
    <div slot="a" class="relative flex">
      <slot />
    </div>
    <div slot="b" class="relative h-full">
      <slot name="timeline" />
    </div>
  </Splitter>
</div>
