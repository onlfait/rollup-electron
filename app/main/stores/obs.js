const create = require("./create");

const defaults = {
  autoConnectAtStartup: false
};

module.exports = create({ name: "obs", defaults });
