const { contextBridge } = require("electron");

const remote = require("../../bridges/remote");
const darkMode = require("../../bridges/darkMode");
const titlebar = require("../../bridges/titlebar");

contextBridge.exposeInMainWorld("app", {
  remote: remote.api,
  darkMode: darkMode.api,
  titlebar: titlebar.api
});

document.addEventListener("DOMContentLoaded", async () => {
  await darkMode.init();
  await titlebar.create();
});
