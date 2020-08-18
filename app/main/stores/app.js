const create = require("./create");

const defaults = {
  darkMode: true,
  language: "en"
};

module.exports = create({ name: "app", defaults });
