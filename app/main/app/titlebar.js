module.exports = function createTitlebar({ win, ...options }) {
  const wc = win.webContents;
  wc.on("dom-ready", () => {
    wc.insertCSS("body { color:red }");
    wc.executeJavaScript("console.log('pouet')");
  });
};
