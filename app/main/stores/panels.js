const create = require("./create");

const defaults = {
  editMode: false,
  currentId: null,
  panels: [],
  grids: {}
};

module.exports = create({ name: "panels", defaults });
