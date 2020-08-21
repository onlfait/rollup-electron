<script>
  import { scenesList } from "../../../stores/obs";

  export let widget = null;

  $: if (widget && $scenesList) {
    const scene = $scenesList[0] && $scenesList[0].name;

    if (!widget.component.props.scene) {
      widget.component.props.scene = scene;
    }
  }
</script>

<div class="flex flex-wrap">

  <div class="flex flex-col">
    <div class="font-medium">Scene n°1</div>
    <div class="flex items-center">
      <select bind:value={widget.component.props.scene}>
      {#each $scenesList as scene}
        <option value={scene.name}>
          {scene.name}
        </option>
      {/each}
      </select>
    </div>
  </div>

</div>
