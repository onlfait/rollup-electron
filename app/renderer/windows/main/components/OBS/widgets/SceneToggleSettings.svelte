<script>
  import { scenesList } from "../../../stores/obs";

  export let widget = null;

  $: if (widget && $scenesList) {
    const scene1 = $scenesList[0] && $scenesList[0].name;
    const scene2 = ($scenesList[1] && $scenesList[1].name) || scene1;

    if (!widget.component.props.scene1) {
      widget.component.props.scene1 = scene1;
    }

    if (!widget.component.props.scene2) {
      widget.component.props.scene2 = scene2;
    }
  }
</script>

<div class="flex flex-wrap">

  <div class="flex flex-col">
    <div class="font-medium">Scene n°1</div>
    <div class="flex items-center">
      <select bind:value={widget.component.props.scene1}>
      {#each $scenesList as scene}
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
      <select bind:value={widget.component.props.scene2}>
      {#each $scenesList as scene}
        <option value={scene.name}>
          {scene.name}
        </option>
      {/each}
      </select>
    </div>
  </div>

</div>
