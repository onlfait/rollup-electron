const create = require("./create");

const defaults = {
  currentId: null,
  panels: [],
  grids: {}
};

module.exports = create({ name: "panels", defaults });
