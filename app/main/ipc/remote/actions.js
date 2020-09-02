const { send: obsSend, events: obsEvents } = require("../../obs");
const { sendAction } = require("../../overlay");
const { v4: uuid } = require("uuid");

const queue = [];
let running = false;
let timeoutFactor = 1.2;
let defaultTimeout = 5000;

const sendTo = {
  overlay: sendToOverlay,
  obs: sendToOBS
};

function log(...args) {
  // eslint-disable-next-line
  console.log("[action]", ...args);
}

function logAction(type, action, ...rest) {
  // eslint-disable-next-line
  log(`[${type}] ${action.type} | ${action.name} | ${action.id}`, ...rest);
}

function sendToOverlay(action, resolve) {
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

function sendToOBS(action, resolve) {
  let listener = null;
  const timeout = (action.timeout || defaultTimeout) * timeoutFactor;

  if (action.name === "SetCurrentScene") {
    listener = {
      name: "TransitionEnd",
      callback(response) {
        if (response["to-scene"] === action.props["scene-name"]) {
          resolve({ error: null, response });
        }
      }
    };
  }

  listener && obsEvents.once(listener.name, listener.callback);

  setTimeout(() => {
    const error = { type: "timeout", message: `Action timeout ${timeout} ms` };
    listener && obsEvents.off(listener.name, listener.callback);
    resolve({ error, response: null });
  }, timeout);

  return obsSend(action.name, action.props)
    .catch(error => resolve({ error, response: null }));
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

  sendTo[action.target](action, resolve).then(() => {
    running = false;
    processQueue();
  });
}

function sendImmediat(action) {
  return new Promise(resolve => sendTo[action.target](action, resolve));
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
