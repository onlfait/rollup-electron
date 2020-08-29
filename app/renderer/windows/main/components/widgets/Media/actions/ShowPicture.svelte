<script>
  export let widget;
  export let file;
  export let width;
  export let duration;

  function showPicture() {
    app.remote.call('actions.showPicture', { file, width, duration });
  }
</script>

<div on:click={showPicture} class="flex flex-col w-full h-full cursor-pointer">
  <div class="flex p-2 font-bold text-xl h-full items-center">
    <div class="text-center font-bold truncate">
      {file}
    </div>
  </div>
</div>
