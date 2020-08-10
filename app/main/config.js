const isDev = process.argv.includes("--dev");
const isDebug = process.argv.includes("--debug");

module.exports = {
  isDev,
  isDebug
};
