const { ipcRenderer } = require("electron");
const preload = require("../../preload");

const titlebar = { name: "titlebar", options: { title: "Unexpected error" } };

preload(["remote", "darkMode", titlebar]).then(() => {
  console.log("preloaded !");
});

ipcRenderer.on("app.uncaughtError", (event, error) => {
  console.log("app.uncaughtError:", error);
});
