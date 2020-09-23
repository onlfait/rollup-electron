<script>
  import Icon from "../../Icon.svelte";
  import { getAnimeIcon } from "../libs/anime";

  export let type;
</script>

<Icon icon={getAnimeIcon(type)} class="w-4 h-4 flex-shrink-0" />
