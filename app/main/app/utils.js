const isDev = process.argv.includes("--dev");
const isDebug = process.argv.includes("--debug");
const hasDevTools = isDev || isDebug;
const livereload = { host: "localhost", port: 42042 };

module.exports = {
  isDev,
  isDebug,
  hasDevTools,
  livereload
};
