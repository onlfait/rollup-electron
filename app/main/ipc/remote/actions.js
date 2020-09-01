const { sendAction } = require("../../overlay");
const { v4: uuid } = require("uuid");

const queue = [];
let running = false;

function log(...args) {
  // eslint-disable-next-line
  console.log("[action]", ...args);
}

function logAction(type, action, ...rest) {
  // eslint-disable-next-line
  log(`[${type}] ${action.type} | ${action.name} | ${action.id}`, ...rest);
}

function send(action, resolve) {
  logAction("send", action);
  return sendAction(action)
    .then(response => {
      logAction("response", action);
      return { error: null, response };
    })
    .catch(error => {
      logAction("error", action, "|", error.message);
      return { error, response: null };
    })
    .then(resolve);
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
  const [action, resolve] = queue.shift();

  send(action, resolve).then(() => {
    running = false;
    processQueue();
  });
}

function sendImmediat(action) {
  return new Promise(resolve => send(action, resolve));
}

function appendAction(action) {
  return new Promise(resolve => {
    queue.push([action, resolve]);
    processQueue();
  });
}

function prependAction(action) {
  return new Promise(resolve => {
    queue.unshift([action, resolve]);
    processQueue();
  });
}

module.exports = {
  push(action) {
    const uniqueAction = { id: uuid(), ...action };

    logAction("push", uniqueAction);

    if (uniqueAction.type === "immediat") {
      return sendImmediat(uniqueAction);
    }

    if (uniqueAction.type === "queued") {
      return appendAction(uniqueAction);
    }

    if (uniqueAction.type === "asap") {
      return prependAction(uniqueAction);
    }
  }
};
