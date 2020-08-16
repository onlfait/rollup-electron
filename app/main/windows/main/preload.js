console.log("app/main/windows/main/preload.js");

const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("app", {
  remote: require("../../bridges/remote"),
  darkMode: require("../../bridges/darkMode")
});
