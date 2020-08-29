<script>
  import { scenesList } from "../../../../stores/obs";
  import Select from "../../../Select.svelte";

  export let widget = null;

  $: if (widget && $scenesList) {
    const scene1 = $scenesList[0] && $scenesList[0].name;
    const scene2 = ($scenesList[1] && $scenesList[1].name) || scene1;

    if (!widget.props.component.scene1) {
      widget.props.component.scene1 = scene1;
    }

    if (!widget.props.component.scene2) {
      widget.props.component.scene2 = scene2;
    }
  }
</script>

<div class="flex flex-wrap space-x-2">

  <div class="flex flex-col">
    <div class="font-medium">Scene n°1</div>
    <div class="flex items-center">
      <Select
        labelKey="name"
        returnType="name"
        items={$scenesList}
        bind:value={widget.props.component.scene1}
      />
    </div>
  </div>

  <div class="flex flex-col">
    <div class="font-medium">Scene n°2</div>
    <div class="flex items-center">
      <Select
        labelKey="name"
        returnType="name"
        items={$scenesList}
        bind:value={widget.props.component.scene2}
      />
    </div>
  </div>

</div>
