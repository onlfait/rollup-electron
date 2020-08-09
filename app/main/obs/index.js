const store = require("../stores/obs");
const OBSWebSocket = require("obs-websocket-js");

let obs = null;
let reconnectionTimeout = 5000;

function log(...args) {
  // eslint-disable-next-line
  console.log(">>> OBS:", ...args);
}

exports.store = store;

exports.send = function(...args) {
  if (!obs) {
    return Promise.reject("OBS is not initialized");
  }
  return obs.send(...args);
};

exports.connect = function connect({
  host = "localhost",
  port = 4444,
  password = null,
  win
} = {}) {
  if (obs) return;
  obs = new OBSWebSocket();
  const address = `${host}:${port}`;

  log("Connect");

  const reconnect = () => {
    obs = null;
    // setTimeout(() => {
    //   log("Reconnection...");
    //   connect({ host, port, password, win });
    // }, reconnectionTimeout);
  };

  const send = (type, data) => win.webContents.send("obs", { type, data });

  obs.on("ConnectionOpened", () => {
    log("Connection opened");
    send("opened");
  });

  obs.on("ConnectionClosed", () => {
    log("Connection closed");
    send("closed");
    reconnect();
  });

  obs
    .connect({ address, password })
    .then(() => {
      log("Connected");
      const onmessage = obs._socket.onmessage;
      obs._socket.onmessage = msg => {
        onmessage(msg);
        const message = JSON.parse(msg.data);
        if (message["update-type"]) {
          const type = message["update-type"];
          send(type, message);
          log("event:", type);
        }
      };
    })
    .catch(error => {
      log("Error:", error.code);
      reconnect();
    });
};
