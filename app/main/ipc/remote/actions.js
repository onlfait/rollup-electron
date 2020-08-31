const { sendAction } = require("../../overlay");
const { v4: uuid } = require("uuid");

const queue = [];
let running = false;

function log(...args) {
  // eslint-disable-next-line
  console.log("[action]", ...args);
}

function logAction(type, action) {
  // eslint-disable-next-line
  log(`[${type}] ${action.type} | ${action.name} | ${action.id}`);
}

function send(action, resolve, reject) {
  logAction("send", action);
  return sendAction(action)
    .then(response => {
      logAction("response", action);
      resolve({ error: null, response });
    })
    .catch(error => {
      logAction("error", action);
      reject({ error, response: null });
    });
}

function processQueue() {
  if (running) return;
  running = true;

  if (!queue.length) {
    log("End of queue!");
    running = false;
    return;
  }

  log(`Processing queue (count: ${queue.length})`);
  const [action, resolve, reject] = queue.shift();

  send(action, resolve, reject).then(() => {
    running = false;
    processQueue();
  });
}

function sendImmediat(action) {
  return new Promise((resolve, reject) => {
    send(action, resolve, reject);
  });
}

function appendAction(action) {
  return new Promise((resolve, reject) => {
    queue.push([action, resolve, reject]);
    processQueue();
  });
}

function prependAction(action) {
  return new Promise((resolve, reject) => {
    queue.unshift([action, resolve, reject]);
    processQueue();
  });
}

module.exports = {
  push(action) {
    action.id = uuid();
    logAction("push", action);

    if (action.type === "immediat") {
      return sendImmediat(action);
    }

    if (action.type === "queued") {
      return appendAction(action);
    }

    if (action.type === "asap") {
      return prependAction(action);
    }
  }
};
