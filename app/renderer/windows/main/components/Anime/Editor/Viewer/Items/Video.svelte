<script>
  import { getPropsFromAttrs, getStyleFromAttrs } from "../../../libs/anime";

  export let item;
  export let path = "/public/media/videos";
</script>

<video
  class="absolute"
  id="item-{item.id}"
  src="{path}/{item.target.name}"
  {...getPropsFromAttrs(item.target.attrs)}
  style={getStyleFromAttrs(item.target.attrs)}>
  <track kind="captions" />
</video>
