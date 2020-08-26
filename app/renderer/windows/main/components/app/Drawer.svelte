<script>
  import Openable from "../Openable.svelte";
  import Trigger from "./Drawer/Trigger.svelte";
  import Content from "./Drawer/Content.svelte";
</script>

<Openable>
  <Trigger />
  <div slot="open" on:click|stopPropagation>
    <Content />
  </div>
</Openable>
