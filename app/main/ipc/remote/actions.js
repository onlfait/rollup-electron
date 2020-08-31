const { sendAction } = require("../../overlay");

function log(...args) {
  // eslint-disable-next-line
  console.log("[action]", ...args);
}

module.exports = {
  push(action) {
    log(`[push] ${action.type} | ${action.name}`);
    return sendAction(action)
      .then(response => Promise.resolve({ error: null, response }))
      .catch(error => Promise.resolve({ error, response: null }));
  }
};
