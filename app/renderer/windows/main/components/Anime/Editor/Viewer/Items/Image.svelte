<script>
  import getStyle from "../../../libs/getStyle";

  export let item;
  export let path = "/public/media/images";
</script>

<img
  class="absolute"
  draggable={false}
  id="item-{item.id}"
  alt="item-{item.id}"
  src="{path}/{item.target.name}"
  style={getStyle(item.target.style)}
/>
