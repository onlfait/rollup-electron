const panels = require("../stores/panels");
const create = require("../stores/create");
const fs = require("fs-extra");

const defaults = {
  items: []
};

function getGrid(name) {
  return create({ name, dir: "stores/grids", defaults });
}

module.exports = {
  saveGrid(event, { id, items }) {
    getGrid(id).set("items", items);
  },

  getAll() {
    const grids = {};

    panels.get("items", []).forEach(({ id }) => {
      grids[id] = getGrid(id).get("items", []);
    });

    return grids;
  },

  removeGrid(event, id) {
    fs.removeSync(getGrid(id).path);
  }
};
