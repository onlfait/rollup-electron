<script>
  import {
    connected,
    scenesList,
    currentScene,
    updateSceneList
  } from "../../../../stores/obs";

  import WidgetWrapper from "../WidgetWrapper.svelte";

  export let widget;
  export let action;
  export let running = 0;

  function sendAction(action) {
    running++;
    app.remote.call("actions.push", action)
      .then(({ error, response }) => {
        console.log("DONE", { error, response });
        running--;
      }).catch(error => {
        console.warn("WARN", error);
        running--;
      });
  }

  function setCurrentScene(scene) {
    sendAction({
      target: "obs",
      name: "SetCurrentScene",
      type: action.type,
      props: { "scene-name": scene }
    });
  }

  $: $connected && updateSceneList();
</script>

<WidgetWrapper {widget}>
  {#if !$scenesList.length}
    <div class="p-2">No scenes found...</div>
  {:else}
    {#each $scenesList as {name}}
    <div
      on:click={setCurrentScene.bind(null, name)}
      class="p-2 cursor-pointer {name === $currentScene ? 'bg-black bg-opacity-50' : 'hover:bg-black hover:bg-opacity-25'}"
    >{name}</div>
    {/each}
  {/if}
</WidgetWrapper>
