<script>
  import { scenes, scene, setCurrentScene } from "../../../stores/obs";

  $: scenesArray = ($scenes && $scenes.scenes) || [];
</script>

<div class="flex flex-col w-full">
	{#each scenesArray as {name}}
	<div
    on:click={setCurrentScene.bind(null, name)}
    class="p-2 cursor-pointer {name === $scene ? 'bg-black bg-opacity-50' : 'hover:bg-black hover:bg-opacity-25'}"
    >{name}</div>
	{/each}
</div>
