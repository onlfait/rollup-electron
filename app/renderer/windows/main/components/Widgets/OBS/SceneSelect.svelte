<script>
  import { onMount } from "svelte";
  import Select from "../../Select.svelte";
  import { scenesList, updateSceneList } from "../../../stores/obs";

  export let scene;
  export let label = "Scene";

  onMount(updateSceneList);

  $: if (!scene && $scenesList) {
    scene = ($scenesList[0] && $scenesList[0].name) || null;
  }

  function onChange({ detail }) {
    scene = detail.name;
  }
</script>

<div class="flex-auto flex-col">
  <div class="font-medium">{label}</div>
  <div class="flex items-center">
    <Select
      labelKey="name"
      valueKey="name"
      value={scene}
      items={$scenesList}
      on:change={onChange}
    />
  </div>
</div>
