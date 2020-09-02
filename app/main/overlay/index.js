const { userPath } = require("../config");
const { fork } = require("child_process");
const EventEmitter = require("events");
const path = require("path");

let server = null;
let timeoutFactor = 1.2;
let defaultTimeout = 5000;

const overlayEmitter = new EventEmitter();
const publicPath = path.resolve(userPath, "public/media");

function log(...args) {
  // eslint-disable-next-line
  console.log(...args);
}

function on(...args) {
  overlayEmitter.on(...args);
}

function once(...args) {
  overlayEmitter.once(...args);
}

function off(...args) {
  overlayEmitter.off(...args);
}

function start() {
  if (server) return server;

  const argv = [...process.argv, "--public", publicPath];
  server = fork(path.resolve(__dirname, "server.js"), argv, { stdio: "pipe" });

  server.stdout.on("data", data => {
    log(data.toString());
  });

  server.stderr.on("data", data => {
    log("[error]", data.toString());
  });

  server.on("message", message => {
    // log("[message]", message);
    overlayEmitter.emit(message.id, message);
  });

  server.on("error", err => {
    log("[error]", err.stack);
  });

  server.on("exit", code => {
    log(`Exited (code: ${code})`);
    server = null;
  });

  return server;
}

function getTimeout(data) {
  let timeout = data.timeout || defaultTimeout;
  let duration = data.props.duration || timeout;
  let delay = data.props.delay || 0;
  return (duration + delay) * timeoutFactor;
}

function sendAction(action) {
  return new Promise((resolve, reject) => {
    const timeout = getTimeout(action);
    const listener = ({ error = null, response = null } = {}) => {
      error ? reject(error) : resolve(response);
    };
    once(action.id, listener);
    start().send(action);
    setTimeout(() => {
      off(action.id, listener);
      reject({ type: "timeout", message: `Action timeout ${timeout} ms` });
    }, timeout);
  });
}

function stop() {
  if (server) {
    server.kill();
    server = null;
  }
}

module.exports = { start, on, once, off, sendAction, stop };
