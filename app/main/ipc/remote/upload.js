const path = require("path");
const fs = require("fs-extra");

const { publicPath } = require("../../config");

module.exports = {
  async gridIcon({ name, path: source }) {
    name = name.replace(/[^a-z0-9_.]+/gi, "_");
    const target = path.resolve(publicPath, "media/images", name);
    await fs.copy(source, target);
    return name;
  }
};
