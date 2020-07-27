const { BrowserWindow } = require("electron");

function setDarkMode(darkMode) {
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.executeJavaScript(
      `locale.setDarkMode(${darkMode ? "true" : "false"})`
    );
  });
}

function setDarkModeIPC(e, darkMode) {
  setDarkMode(darkMode);
}

function setDarkModeRemote(ipcRenderer) {
  return (darkMode = true) => {
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
  setDarkModeIPC,
  setDarkModeRemote,
  setDarkModeLocale
};
