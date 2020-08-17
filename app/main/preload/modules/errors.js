const { ipcRenderer } = require("electron");
const EventEmitter = require("events");

const errors = [];
const events = new EventEmitter();

const api = {
  getAll: () => errors,
  on: (...args) => events.on(...args)
};

function addError(error) {
  errors.push(error);
  events.emit("errors", errors);
}

ipcRenderer.on("app.uncaughtError", (event, error) => addError(error));

module.exports = { api };
