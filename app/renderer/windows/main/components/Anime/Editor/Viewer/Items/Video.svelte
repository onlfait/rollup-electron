<script>
  import getAttrs from "../../../libs/getAttrs";
  import getStyle from "../../../libs/getStyle";

  export let item;
  export let path = "/public/media/videos";
</script>

<video
  class="absolute"
  id="item-{item.id}"
  src="{path}/{item.target.name}"
  {...getAttrs(item.target.attrs)}
  style={getStyle(item.target.style)}>
  <track kind="captions" />
</video>
