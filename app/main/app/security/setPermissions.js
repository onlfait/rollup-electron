const { session } = require("electron");
const chalk = require("chalk");

// https://github.com/reZach/secure-electron-template/blob/master/app/electron/main.js#L109
// Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest

function requestHandler({ permissions, permission, callback }) {
  if (permissions.includes(permission)) {
    return callback(true);
  }

  // eslint-disable-next-line
  console.error(
    chalk.red(
      `The application tried to request permission for '${permission}'.
      This permission was not whitelisted and has been blocked. `
    )
  );

  callback(false); // Deny
}

// FIX: setPermission[Request|Check]Handler was never called
module.exports = function setPermissions(permissions = []) {
  const h = (webContents, permission, callback) => {
    requestHandler({ permissions, permission, callback });
  };

  session.defaultSession.setPermissionRequestHandler(h);
  session.defaultSession.setPermissionCheckHandler(h);
};
