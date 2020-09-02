const OBSWebSocket = require("obs-websocket-js");
const { getMainWindow } = require("../app/windows");
const EventEmitter = require("events");

let obs = null;
let autoReconnect = true;
let reconnectionTimeout = 5000;
let reconnectionTimeoutId = null;

const events = new EventEmitter();

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
  log(`Reconnecting in ${reconnectionTimeout / 1000} sec.`);
  setStatus({ connected: false, connecting: true });
  reconnectionTimeoutId = setTimeout(() => {
    connect(settings);
  }, reconnectionTimeout);
}

function send(type, ...args) {
  events.emit(type, ...args);
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
  send("status", status);
}

function connect({ host = "localhost", port = 4444, password = null } = {}) {
  if (obs) return;

  autoReconnect = true;
  const address = `${host}:${port}`;

  setStatus({ connected: false, connecting: true });
  log(`Connect (${address})`);
  send("connect");

  function onConnectionClosed() {
    setStatus({ connected: false, connecting: false });
    log("Connection closed");
    send("disconnected");
    obs = null;
    autoReconnect && reconnect({ host, port, password });
  }

  obs = new OBSWebSocket();

  obs
    .connect({ address, password })
    .then(() => {
      log("Connected");
      setStatus({ connected: true, connecting: false });
      obs.on("ConnectionClosed", onConnectionClosed);
      send("connected");
      onMessage(obs);
    })
    .catch(error => {
      log(`Error: ${error.code}`);
      setStatus({ connected: false, connecting: autoReconnect });
      autoReconnect && reconnect({ host, port, password });
    });
}

function disconnect() {
  setStatus({ connected: false, connecting: false });
  clearTimeout(reconnectionTimeoutId);
  reconnectionTimeoutId = null;
  obs && obs.disconnect();
  autoReconnect = false;
  obs = null;
}

function obsSend(...args) {
  if (!obs) {
    return Promise.reject("OBS is not initialized");
  }
  return obs.send(...args);
}

module.exports = {
  getStatus,
  connect,
  disconnect,
  send: obsSend,
  events
};
