const { BrowserWindow } = require("electron");

function setWinDarkMode(win, darkMode) {
  win.webContents.executeJavaScript(
    `locale.setDarkMode(${darkMode ? "true" : "false"})`
  );
}

function setDarkMode(darkMode) {
  BrowserWindow.getAllWindows().forEach(win => {
    setWinDarkMode(win, darkMode);
  });
}

function setDarkModeIPC(e, darkMode) {
  setDarkMode(darkMode);
}

function setDarkModeRemote(ipcRenderer) {
  return darkMode => {
    ipcRenderer.invoke("setDarkMode", darkMode);
  };
}

function setDarkModeLocale(darkMode = null) {
  darkMode = darkMode === null ? true : !!darkMode;

  console.log("setDarkModeLocale >>>", darkMode);

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
