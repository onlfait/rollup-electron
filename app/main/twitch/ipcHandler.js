function callAPI({ api, args }) {
  const client = require("./client")();
  const path = api.split(".");

  let parent = client;
  let func = parent[path.shift()];

  for (let i = 0; i < path.length; i++) {
    if (!func) break;
    parent = func;
    func = func[path[i]];
  }

  if (!func) {
    throw new Error(`Undefined API ${api}`);
  }

  if (!func || typeof func !== "function") {
    throw new Error(`Undefined method "${api}"`);
  }

  return func.call(parent, args);
}

module.exports = async function ipcHandler(event, { api, args }) {
  try {
    const ret = await callAPI({ api, args });
    return { error: null, data: ret._data || ret };
  } catch (error) {
    return { error: error.message || error, data: null };
  }
};
