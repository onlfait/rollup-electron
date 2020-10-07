<script>
  import { getStyleFromAttrs } from "../../../libs/anime";

  export let item;
  export let path = "/public/media/images";
</script>

<img
  class="absolute"
  draggable={false}
  id="item-{item.id}"
  alt="item-{item.id}"
  src="{path}/{item.target.name}"
  style={getStyleFromAttrs(item.target.attrs)}
/>
