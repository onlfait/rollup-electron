<script>
  export let widget = null;
  export let file = null;

  export let duration = 5;
  export let width = 442;

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
