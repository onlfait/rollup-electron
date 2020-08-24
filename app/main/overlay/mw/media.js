const path = require("path");
const sirv = require("sirv");

const argv = [...process.argv];
const publicPath = argv.pop(argv);
const isDev = argv.includes("--dev");

module.exports = sirv(path.resolve(publicPath, "public/media"), {
  dev: isDev,
  immutable: true,
  maxAge: 31536000
});
