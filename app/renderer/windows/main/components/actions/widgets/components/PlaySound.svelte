<script>
  export let widget = null;
  export let file = null;
  export let volume = 0.8;
  export let playNow = true;

  function playSoundNow() {
    return new Promise((resolve, reject) => {
      const audio = new Audio(`app://renderer/public/media/sounds/${file}`);

      audio.volume = volume;
      audio.onerror = (e) => reject(e);
      audio.onended = (e) => resolve(e);
      audio.oncanplay = () => audio.play();
    });
  }

  function playSound() {
    if (playNow) {
      playSoundNow();
    } else {
      app.remote.call('actions.playSound', file);
    }
  }
</script>

<div on:click={playSound} class="flex flex-col w-full h-full cursor-pointer">
  <div class="flex p-2 font-bold text-xl h-full items-center">
    <div class="text-center font-bold truncate">
      {file}
    </div>
  </div>
</div>
