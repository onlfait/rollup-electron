const createWindow = require("../../app/window/create");
const { getMainWindow } = require("../../app/windows");
const fs = require("fs-extra");
const path = require("path");

const stylesPath = path.resolve(__dirname, "../styles.css");
const styles = fs.readFileSync(stylesPath).toString();

module.exports = function create({ channel = "skarab42" } = {}) {
  const win = createWindow({
    name: `twitch-chat-${channel}`,
    show: true,
    width: 540,
    height: 480,
    unique: true,
    storeBounds: true,
    hideOnClose: true,
    preload: "twitch-chat",
    parent: getMainWindow(),
    loadURL: `https://www.twitch.tv/embed/${channel}/chat?parent=localhost`
  });

  win.webContents.on("dom-ready", () => {
    win.webContents.insertCSS(styles);
  });

  return win;
};
