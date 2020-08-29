<script>
  import {
    connected,
    scenesList,
    currentScene,
    updateSceneList,
    setCurrentScene
  } from "../../../../stores/obs";

  import WidgetWrapper from "../WidgetWrapper.svelte";

  export let widget;

  $: if ($connected) {
    updateSceneList();
  }
</script>

<WidgetWrapper>
  {#if !$scenesList.length}
    <div>No scenes found...</div>
  {:else}
    {#each $scenesList as {name}}
    <div
      on:click={setCurrentScene.bind(null, name)}
      class="p-2 cursor-pointer {name === $currentScene ? 'bg-black bg-opacity-50' : 'hover:bg-black hover:bg-opacity-25'}"
    >{name}</div>
    {/each}
  {/if}
</WidgetWrapper>
