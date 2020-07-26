module.exports = function toggleMainWindow(win) {
  win.isVisible() ? win.hide() : win.show();
};
