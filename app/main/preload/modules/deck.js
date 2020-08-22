const remote = require("./remote");

const panels = {
  async set(items) {
    await remote.api.call("deck.panels.set", items);
  },
  async get() {
    return await remote.api.call("deck.panels.get");
  }
};

const currentPanelId = {
  async set(id) {
    await remote.api.call("deck.currentPanelId.set", id);
  },
  async get() {
    return await remote.api.call("deck.currentPanelId.get");
  }
};

module.exports = { api: { panels, currentPanelId } };
