const { send } = require("../../overlay");

function log(...args) {
  // eslint-disable-next-line
  console.log("[action]", ...args);
}

module.exports = {
  push(action) {
    log(`[push] ${action.type} | ${action.name}`);
    return send({ data: action, timeout: action.timeout })
      .then(results => Promise.resolve({ error: null, results }))
      .catch(error => Promise.resolve({ error, results: null }));
  }
};
