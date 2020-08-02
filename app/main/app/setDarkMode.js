const { BrowserWindow } = require("electron");

function setWinDarkMode(win, darkMode) {
  win.webContents.send("setDarkMode", darkMode);
}

function setDarkMode(darkMode) {
  BrowserWindow.getAllWindows().forEach(win => {
    setWinDarkMode(win, darkMode);
  });
}

function setDarkModeIPC(e, darkMode) {
  const store = require("../stores/app");
  store.set("darkMode", darkMode);
  setDarkMode(darkMode);
}

function setDarkModeRemote(ipcRenderer) {
  return darkMode => {
    ipcRenderer.invoke("setDarkMode", darkMode);
  };
}

function setDarkModeLocale(darkMode) {
  const $html = document.querySelector("html");
  $html.classList.toggle("theme--dark", darkMode);
  $html.classList.toggle("theme--light", !darkMode);
  $html.classList.toggle("tw-root--theme-dark", darkMode);
  $html.classList.toggle("tw-root--theme-light", !darkMode);
}

module.exports = {
  setDarkMode,
  setWinDarkMode,
  setDarkModeIPC,
  setDarkModeRemote,
  setDarkModeLocale
};
