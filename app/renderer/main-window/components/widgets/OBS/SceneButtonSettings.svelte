<script>
  import { scenes  } from "../../../stores/obs";

  export let item = null;

  $: scenesArray = ($scenes && $scenes.scenes) || [];

  $: if (item && scenesArray) {
    const scene = scenesArray[0] && scenesArray[0].name;
    if (scene && !item.widget.props.scene) {
      item.widget.props.scene = scene;
    }
  }
</script>

<div class="flex flex-wrap">
  <div class="flex flex-col">
    <div class="font-medium">Scene</div>
    <div class="flex items-center">
      <select bind:value={item.widget.props.scene}>
      {#each scenesArray as scene}
        <option value={scene.name}>
          {scene.name}
        </option>
      {/each}
      </select>
    </div>
  </div>
</div>
