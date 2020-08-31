const { send, once } = require("../../overlay");
const { v4: uuid } = require("uuid");

const queue = [];
const state = { running: false };

function log(...args) {
  // eslint-disable-next-line
  console.log("[action]", ...args);
}

function actionFactory(action) {
  return { id: uuid(), type: "action", action };
}

function processQueue() {
  if (state.running) return;
  state.running = true;

  log("Process queue...");
  const action = queue.shift();

  if (!action) {
    log("End of queue!");
    state.running = false;
    return;
  }

  once(action.id, (results) => {
    console.log({results});
    log("Done!", action.id);
    state.running = false;
    processQueue();
  });

  log("Send", action.id);
  send(action);
}

module.exports = {
  push(action) {
    if (action.type === "immediat") {
      return send(actionFactory(action));
    }

    if (action.type === "queued") {
      queue.push(actionFactory(action));
      processQueue();
    }
  }
};
