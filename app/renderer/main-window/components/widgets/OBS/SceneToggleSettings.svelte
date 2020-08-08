<script>
  import { scenes  } from "../../../stores/obs";

  export let item = null;

  $: scenesArray = ($scenes && $scenes.scenes) || [];

  $: if (item && scenesArray) {
    const scene1 = scenesArray[0] && scenesArray[0].name;
    const scene2 = (scenesArray[1] && scenesArray[1].name) || scene1;
    if (!item.widget.props.scene1) {
      item.widget.props.scene1 = scene1;
    }
    if (!item.widget.props.scene2) {
      item.widget.props.scene2 = scene2;
    }
  }
</script>

<div class="flex flex-wrap">

  <div class="flex flex-col">
    <div class="font-medium">Scene n°1</div>
    <div class="flex items-center">
      <select bind:value={item.widget.props.scene1}>
      {#each scenesArray as scene}
        <option value={scene.name}>
          {scene.name}
        </option>
      {/each}
      </select>
    </div>
  </div>

  <div class="flex flex-col">
    <div class="font-medium">Scene n°2</div>
    <div class="flex items-center">
      <select bind:value={item.widget.props.scene2}>
      {#each scenesArray as scene}
        <option value={scene.name}>
          {scene.name}
        </option>
      {/each}
      </select>
    </div>
  </div>

</div>
