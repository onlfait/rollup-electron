const { contextBridge } = require("electron");

module.exports = names => {
  const api = {};
  const init = [];

  names.forEach(name => {
    let options = {};
    if (typeof name !== "string") {
      options = name.options || {};
      name = name.name;
    }
    const bridge = require(`./modules/${name}`);
    bridge.init && init.push([bridge.init, options]);
    api[name] = bridge.api;
  });

  contextBridge.exposeInMainWorld("app", api);

  document.addEventListener("DOMContentLoaded", async () => {
    for (let i = 0; i < init.length; i++) {
      const [func, options] = init[i];
      await func(options);
    }
  });
};
