const get = require("./get");

module.exports = function call(event, endpoint, ...args) {
  const prop = get(event, endpoint);

  if (typeof prop !== "function") {
    throw new Error(`Remote endpoint must be callable: ${endpoint}`);
  }

  return prop(...args);
};
