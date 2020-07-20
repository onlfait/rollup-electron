const isDev = process.argv.includes("--dev");
const isDebug = process.argv.includes("--debug");
const hasDevTools = isDev || isDebug;

module.exports = {
  isDev,
  isDebug,
  hasDevTools
};
