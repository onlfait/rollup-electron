<script>
  import { getPropsFromAttrs } from "../../../libs/anime";

  export let item;
  export let path = "/public/media/audios";
</script>

<audio
  class="hidden"
  id="item-{item.id}"
  src="{path}/{item.target.name}"
  {...getPropsFromAttrs(item.target.attrs)}>
  <track kind="captions" />
</audio>
