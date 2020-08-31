const get = require("./get");

module.exports = async function call(event, endpoint, ...args) {
  const func = get(event, endpoint);

  if (typeof func !== "function") {
    throw new Error(`Remote endpoint must be callable: ${endpoint}`);
  }

  return await func(...args);
};
