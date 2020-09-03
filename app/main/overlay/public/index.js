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
  showPicture(props) {
    return new Promise(resolve => {
      let img = document.createElement("img");
      img.setAttribute("src", `images/${props.file}`);
      img.style.position = "absolute";
      img.style.display = "none";
      img.style.top = `${props.top}px`;
      img.style.left = `${props.left}px`;
      props.width > -1 && img.setAttribute("width", props.width);
      props.height > -1 && img.setAttribute("height", props.height);
      document.body.appendChild(img);

      const show = () => {
        img.style.display = "block";
        if (props.anime) {
          const finished = anime({
            targets: img,
            duration: props.duration,
            ...props.anime
          }).finished;
          finished.then(() => {
            img.remove();
            img = null;
            resolve("done");
          });
        } else {
          setTimeout(() => {
            img.remove();
            img = null;
            resolve("done");
          }, props.duration);
        }
      };

      if (props.delay) setTimeout(show, props.delay);
      else show();
    });
  }
};

socket.on("message", (action, ackFn) => {
  const actionPromise = actions[action.name];

  if (!actionPromise) {
    ackFn({
      error: {
        type: "UndefinedAction",
        message: `Undefined action: ${action.name}`
      }
    });
    return;
  }

  actionPromise(action.props)
    .then(response => ackFn({ response }))
    .catch(error => ackFn({ error }));
});
