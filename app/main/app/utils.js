const isDev = process.argv.includes("--dev");
const isDebug = process.argv.includes("--debug");
const hasDevTools = isDev || isDebug;
const devServer = { host: "localhost", port: 42042 };
const { host, port } = devServer;
const appURL = isDev ? `http://${host}:${port}` : "app://renderer";

module.exports = {
  isDev,
  isDebug,
  hasDevTools,
  devServer,
  appURL
};
