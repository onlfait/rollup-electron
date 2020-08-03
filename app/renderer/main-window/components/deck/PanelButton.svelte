<script>
  import Button from "../Button.svelte";

  import { currentId } from "../../stores/panels";

  export let panel = null;

  function setCurrentId(id) {
    $currentId = id;
  }

  $: bg = $currentId === panel.id ? "primary" : "secondary";
</script>

<Button on:click={setCurrentId.bind(null, panel.id)} noShrink {bg}>
  {panel.name}
</Button>
