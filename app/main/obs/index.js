const OBSWebSocket = require("obs-websocket-js");
const { getMainWindow } = require("../app/windows");

let obs = null;
let doNotReconnect = false;
let reconnectionTimeout = 5000;

let status = {
  connected: false,
  connecting: false
};

function log(...args) {
  // eslint-disable-next-line
  console.log(">>> OBS:", ...args);
}

function reconnect(settings) {
  obs = null;
  setStatus({ connected: false, connecting: true });
  log(`Reconnecting in ${reconnectionTimeout / 1000} sec.`);
  setTimeout(() => {
    connect(settings);
  }, reconnectionTimeout);
}

function send(type, ...args) {
  getMainWindow().webContents.send(`obs.${type}`, ...args);
}

function onMessage(obs) {
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
}

function getStatus() {
  return status;
}

function setStatus(newStatus) {
  status = { ...status, ...newStatus };
}

function connect({ host = "localhost", port = 4444, password = null } = {}) {
  if (obs) return;

  const address = `${host}:${port}`;

  setStatus({ connected: false, connecting: true });
  log(`Connect (${address})`);
  send("connect");

  obs = new OBSWebSocket();

  obs.on("ConnectionClosed", () => {
    setStatus({ connected: false, connecting: false });
    log("Connection closed");
    send("disconnected");
    obs = null;
    if (!doNotReconnect) {
      reconnect({ host, port, password });
    }
    doNotReconnect = false;
  });

  obs
    .connect({ address, password })
    .then(() => {
      setStatus({ connected: true, connecting: false });
      log("Connected");
      send("connected");
      onMessage(obs);
    })
    .catch(error => {
      setStatus({ connected: false, connecting: false });
      log(`Error: ${error.code}`);
      reconnect({ host, port, password });
    });
}

function disconnect() {
  doNotReconnect = true;
  obs && obs.disconnect();
}

module.exports = {
  getStatus,
  connect,
  disconnect
};
