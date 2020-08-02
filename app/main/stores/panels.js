const create = require("./create");

const defaults = {
  currentId: null,
  items: []
};

module.exports = create({ name: "panels", defaults });
