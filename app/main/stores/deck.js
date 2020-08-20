const create = require("./create");

const defaults = {
  currentId: null,
  panels: []
};

module.exports = create({ name: "deck", defaults });
