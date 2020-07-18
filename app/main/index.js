const { app } = require("electron");
const registerAppProtocol = require("./app/protocol");
const createMainWindow = require("./main-window/create");

registerAppProtocol();

app.whenReady().then(createMainWindow);
