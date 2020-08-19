const remote = require("./remote");

const panels = {
  async set(items) {
    await remote.api.call("deck.panels.set", items);
  },
  async get() {
    return await remote.api.call("deck.panels.get");
  }
};

const currentId = {
  async set(id) {
    await remote.api.call("deck.currentId.set", id);
  },
  async get() {
    return await remote.api.call("deck.currentId.get");
  }
};

module.exports = { api: { panels, currentId } };
