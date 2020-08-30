const socket = io();

const actions = {
  playSound({ file, volume = 0.8 } = {}) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(`sounds/${file}`);
      audio.volume = volume;
      audio.onerror = e => reject(e);
      audio.onended = e => resolve(e);
      audio.oncanplay = () => audio.play();
    });
  },
  showPicture({ file, width = 500, duration = 5 }) {
    let img = document.createElement("img");
    img.setAttribute("src", `images/${file}`);
    img.setAttribute("width", width);
    document.body.appendChild(img);
    setTimeout(() => {
      img.remove();
      img = null;
    }, 1000 * duration);
  }
};

socket.on("action", ({ name, props }) => {
  const action = actions[name];
  action && action(props);
});
