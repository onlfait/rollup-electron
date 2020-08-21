const { ipcRenderer } = require("electron");
const remote = require("./remote");

let $html = null;

async function get() {
  return await remote.api.call("app.darkMode.get");
}

async function set(enable = true) {
  await remote.api.call("app.darkMode.set", enable);
  return enable;
}

async function toggle() {
  return set(!(await get()));
}

function setDarkMode(enable = true) {
  $html.classList.toggle("theme--dark", enable);
  $html.classList.toggle("theme--light", !enable);
  $html.classList.toggle("tw-root--theme-dark", enable);
  $html.classList.toggle("tw-root--theme-light", !enable);
  return enable;
}

async function init({ delay = 0 } = {}) {
  $html = document.querySelector("html");
  ipcRenderer.on("app.darkMode.set", (event, enable) => setDarkMode(enable));
  const enable = await get();
  delay ? setTimeout(() => setDarkMode(enable), delay) : setDarkMode(enable);
}

module.exports = { init, api: { get, set, toggle } };
