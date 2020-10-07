<script>
  import { fetchText } from "../../../libs/utils";
  import { getStyleFromAttrs } from "../../../libs/anime";

  export let item;
</script>

{#await fetchText(item.target.name) then text}
<div
  class="absolute"
  id="item-{item.id}"
  style={getStyleFromAttrs(item.target.attrs)}>
  {text}
</div>
{/await}
