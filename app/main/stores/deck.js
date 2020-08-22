const create = require("./create");

const defaults = {
  currentPanelId: null,
  panels: []
};

module.exports = create({ name: "deck", defaults });
