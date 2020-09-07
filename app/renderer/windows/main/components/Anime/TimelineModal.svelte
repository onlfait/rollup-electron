<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  import Button from "../Button.svelte";
  import Timeline from "./Timeline.svelte";
  import Splitter from "../Splitter.svelte";
  import MdArrowBack from "svelte-icons/md/MdArrowBack.svelte";

  const dispatch = createEventDispatcher();

  export let timeline;

  let element;

  let position = "absolute z-50 left-0 right-0 bottom-0";
  let theme = "bg-light text-dark dark:bg-dark dark:text-light";

  onMount(() => {
    document.body.append(element);
  });
</script>

<div bind:this={element} class="{position} {theme}" style="top:32px">
  <Splitter save="timeline.main" sizes={[75,25]} flex="col" class="relative">
    <div slot="a">
      <div class="p-2 flex items-center space-x-2">
        <Button class="bg-primary" icon={MdArrowBack} on:click={dispatch.bind(null, "close")}>
          BACK
        </Button>
        <div>
          Objects: {timeline.length}
        </div>
      </div>
    </div>
    <div slot="b" class="h-full">
      <Timeline bind:timeline />
    </div>
  </Splitter>
</div>
