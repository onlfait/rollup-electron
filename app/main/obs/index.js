const OBSWebSocket = require("obs-websocket-js");

let obs = null;
let reconnectionTimeout = 5000;

function log(...args) {
  console.log(">>> OBS:", ...args);
}

exports.send = function(...args) {
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
    setTimeout(() => {
      log("Reconnection...");
      connect({ host, port, password, win });
    }, reconnectionTimeout);
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
    })
    .catch(error => {
      log("Error:", error);
      reconnect();
    });
};
