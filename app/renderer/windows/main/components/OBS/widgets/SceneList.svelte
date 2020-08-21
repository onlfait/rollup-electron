<script>
  import {
    connected,
    scenesList,
    currentScene,
    updateSceneList,
    setCurrentScene
  } from "../../../stores/obs";

  export let item = null;

  $: if ($connected) {
    updateSceneList();
  }
</script>

<div class="flex flex-col w-full">

{#if !$connected}
  <div>OBS offline</div>
{:else if !$scenesList.length}
  <div>No scenes found...</div>
{:else}
  {#each $scenesList as {name}}
  <div
    on:click={setCurrentScene.bind(null, name)}
    class="p-2 cursor-pointer {name === $currentScene ? 'bg-black bg-opacity-50' : 'hover:bg-black hover:bg-opacity-25'}"
  >{name}</div>
  {/each}
{/if}

</div>
