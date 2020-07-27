const Store = require("electron-store");

const defaults = {
  bounds: {
    width: 800,
    height: 600
  }
};

module.exports = function storeWindow({ win, name = "main", delay = 500 }) {
  const store = new Store({ name: `${name}.window`, defaults });

  let timeout = null;

  const loadBounds = () => win.setBounds(store.get("bounds"));
  const updateBounds = () => store.set("bounds", win.getBounds());

  const updateBoundsDelay = () => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(updateBounds, delay);
  };

  win.on("show", loadBounds);
  win.on("hide", updateBounds);
  win.on("close", updateBounds);
  win.on("move", updateBoundsDelay);
  win.on("resize", updateBoundsDelay);
};
