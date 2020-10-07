<script>
  import * as anime from "../../libs/anime";

  export let items;

  let element;

  async function processItems() {
    for (const item of items) {
      const target = await anime.createElementFromTarget(item.target);
      target.setAttribute("id", `anime-${item.id}`);
      target.setAttribute("draggable", false);
      target.style.position = "absolute";
      target.style.maxWidth = "none";
      element.append(target);
    }
  }

  $: if (element && items) {
    element.innerHTML = "";
    processItems();
  }
</script>

<div bind:this={element}></div>
