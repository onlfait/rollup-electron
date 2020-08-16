const { ipcRenderer } = require("electron");

const remote = require("./remote");

let $html = null;

async function get() {
  return await remote.call("app.darkMode.get");
}

async function set(enable = true) {
  await remote.call("app.darkMode.set", enable);
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

ipcRenderer.on("app.darkMode.set", (event, enable) => setDarkMode(enable));

document.addEventListener("DOMContentLoaded", async () => {
  $html = document.querySelector("html");
  setDarkMode(await get());
});

module.exports = { get, set, toggle };
