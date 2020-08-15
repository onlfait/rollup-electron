const dotProp = require("dot-prop");
const remote = require("./remote");

module.exports = function get(event, endpoint) {
  if (typeof endpoint !== "string") {
    throw new Error("Remote endpoint must be string");
  }

  const prop = dotProp.get(remote, endpoint, null);

  if (!prop) {
    throw new Error(`Undefined remote endpoint: ${endpoint}`);
  }

  return prop;
};
