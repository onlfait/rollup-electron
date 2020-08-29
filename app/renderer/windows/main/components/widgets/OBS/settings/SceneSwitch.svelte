<script>
  import { onMount } from "svelte";
  import {
    scenesList,
    updateSceneList
  } from "../../../../stores/obs";
  import Select from "../../../Select.svelte";

  export let widget = null;

  onMount(updateSceneList);

  $: if (widget && $scenesList) {
    const scene = $scenesList[0] && $scenesList[0].name;

    if (!widget.props.component.scene) {
      widget.props.component.scene = scene;
    }
  }
</script>

<div class="flex flex-col">
  <div class="font-medium">Scene n°1</div>
  <div class="flex items-center">
    <Select
      labelKey="name"
      returnType="name"
      items={$scenesList}
      bind:value={widget.props.component.scene}
    />
  </div>
</div>
