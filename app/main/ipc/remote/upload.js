const path = require("path");
const fs = require("fs-extra");

const { publicPath } = require("../../config");

function cleanName(name) {
  return name.replace(/[^a-z0-9_.]+/gi, "_");
}

async function upload({ source, dest }) {
  const name = cleanName(path.basename(source));
  await fs.copy(source, path.resolve(publicPath, `media/${dest}`, name));
  return name;
}

module.exports = {
  async image(source) {
    return upload({ source, dest: "images" });
  },
  async sound(source) {
    return upload({ source, dest: "sounds" });
  }
};
