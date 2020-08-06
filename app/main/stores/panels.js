const create = require("./create");

const defaults = {
  editMode: false,
  currentId: null,
  panels: []
};

module.exports = create({ name: "panels", defaults });
