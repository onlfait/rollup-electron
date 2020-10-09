<script>
  import { fetchText } from "../../../libs/utils";
  import getStyle from "../../../libs/getStyle";

  export let item;
</script>

{#await fetchText(item.target.name) then text}
<div
  class="absolute"
  id="item-{item.id}"
  style={getStyle(item.target.style)}>
  {text}
</div>
{/await}
