const path = require("path");
const fs = require("fs-extra");

const { publicPath } = require("../../config");

function cleanName(name) {
  return name.replace(/[^a-z0-9_.]+/gi, "_");
}

async function upload({ name, source, dest }) {
  name = cleanName(name);
  await fs.copy(source, path.resolve(publicPath, `media/${dest}`, name));
  return name;
}

module.exports = {
  async image({ name, path: source }) {
    return upload({ name, source, dest: "images" });
  },
  async sound({ name, path: source }) {
    return upload({ name, source, dest: "sounds" });
  }
};
