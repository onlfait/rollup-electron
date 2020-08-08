<script>
  import { scenes  } from "../../../stores/obs";

  export let item = null;

  $: scenesArray = ($scenes && $scenes.scenes) || [];
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
