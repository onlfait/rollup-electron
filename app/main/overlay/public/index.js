const socket = io();

const actions = {
  playSound({ file, volume = 0.8 } = {}) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(`sounds/${file}`);
      audio.volume = volume;
      audio.onerror = e => reject(e);
      audio.onended = () => resolve("done");
      audio.oncanplay = () => audio.play().catch(({ message }) => {
        reject({ type: "permission", message });
      });
    });
  },
  showPicture({ file, width = 500, duration = 5000 }) {
    return new Promise(resolve => {
      let img = document.createElement("img");
      img.setAttribute("src", `images/${file}`);
      img.setAttribute("width", width);
      document.body.appendChild(img);
      setTimeout(() => {
        img.remove();
        img = null;
        resolve("done");
      }, parseInt(duration));
    });
  }
};

socket.on("message", (action, ackFn) => {
  const actionPromise = actions[action.name];

  if (!action) {
    ackFn({
      response: null,
      error: {
        type: "UndefinedAction",
        message: `Undefined action: ${action.name}`
      }
    });
    return;
  }

  actionPromise(action.props)
    .then(response => ackFn({ response, error: null }))
    .catch(error => ackFn({ response: null, error }));
});
