const remote = require("./remote");

async function get() {
  return await remote.api.call("app.language.get");
}

async function set(language) {
  await remote.api.call("app.language.set", language);
}

module.exports = { api: { get, set } };
