<script>
  import { onMount } from "svelte";
  import { opened, scenes, scene, updateSceneList } from "../../../stores/obs";

  // $: console.log("$scenes:", $scenes);
  $: console.log("$scene:", $scene);

  $: scenesArray = ($scenes && $scenes.scenes) || [];

  onMount(() => {
    opened && updateSceneList();
  });

  function setCurrentScene(name) {
    remote.obs.emit("SetCurrentScene", { "scene-name": name });
  }
</script>

<div class="flex flex-col w-full">
	{#each scenesArray as {name}}
	<div
    on:click={setCurrentScene.bind(null, name)}
    class="p-2 cursor-pointer {name === $scene ? 'bg-black bg-opacity-50' : 'hover:bg-black hover:bg-opacity-25'}"
    >{name}</div>
	{/each}
</div>
