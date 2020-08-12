const { session } = require("electron");

// https://github.com/reZach/secure-electron-template/blob/master/app/electron/main.js#L109
// Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest
module.exports = function setContentSecurityPolicy(cspRules = {}) {
  let cspRulesArray = Object.entries(cspRules);

  if (!cspRulesArray.length) {
    return;
  }

  cspRulesArray = cspRulesArray.map(([type, values]) => {
    if (typeof values === "string") {
      values = values.trim().split(/ +/);
    } else {
      values = values.map(v => v.trim()).filter(v => v.length);
    }
    values.unshift(type.trim());
    values = [...new Set(values)]; // unique
    return values.join(" ");
  });

  const cspRulesString = cspRulesArray.join(";");

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": cspRulesString
      }
    });
  });
};
