const path = require("path");
const sirv = require("sirv");

const isDev = process.argv.includes("--dev");
const publicPath = path.resolve(__dirname, "../public");

module.exports = sirv(publicPath, {
  dev: isDev,
  immutable: true,
  maxAge: 31536000
});
