<script>
  import Icon from "../../Icon.svelte";

  import MdImage from "svelte-icons/md/MdImage.svelte";
  import MdMusicVideo from "svelte-icons/md/MdMusicVideo.svelte";
  import MdDescription from "svelte-icons/md/MdDescription.svelte";
  import MdOndemandVideo from "svelte-icons/md/MdOndemandVideo.svelte";

  export let type;

  const icons = {
    audio: MdMusicVideo,
    image: MdImage,
    video: MdOndemandVideo,
    text: MdDescription,
  };
</script>

<Icon icon={icons[type]} class="w-4 h-4 flex-shrink-0" />
