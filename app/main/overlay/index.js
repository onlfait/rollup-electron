const { userPath } = require("../config");
const { fork } = require("child_process");
const EventEmitter = require("events");
const path = require("path");

let server = null;

const publicPath = path.resolve(userPath, "public/media");

class OverlayEmitter extends EventEmitter {}

const overlayEmitter = new OverlayEmitter();

function log(...args) {
  // eslint-disable-next-line
  console.log("[overlay]", ...args);
}

function on(...args) {
  overlayEmitter.on(...args);
}

function once(...args) {
  overlayEmitter.once(...args);
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
    log("[message]", message);
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

function send(...args) {
  start().send(...args);
}

function stop() {
  if (server) {
    server.kill();
    server = null;
  }
}

module.exports = { start, on, once, send, stop };
