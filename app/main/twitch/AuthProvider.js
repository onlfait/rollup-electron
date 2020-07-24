const qs = require("qs");
const { AccessToken } = require("twitch");
const createAuthWindow = require("./createAuthWindow");

function normalizeScopes(scopes) {
  if (typeof scopes === "string") {
    scopes = [scopes];
  } else if (!scopes) {
    scopes = [];
  }
  return scopes;
}

function fixTrailingSlash(url) {
  return `${url.replace(/\/+$/, "")}/`;
}

// evily inspired by d-fischer twitch-electron-auth-provider :
// https://github.com/d-fischer/twitch/blob/master/packages/twitch-electron-auth-provider/src/index.ts
module.exports = class AuthProvider {
  constructor({
    clientId,
    redirectURI = "http://localhost",
    forceVerify = false,
    darkMode = true
  } = {}) {
    this.clientId = clientId;
    this.redirectURI = redirectURI;
    this.forceVerify = forceVerify;
    this.darkMode = darkMode;

    this.tokenType = "user";
    this.accessToken = null;
    this.currentScopes = [];
  }

  setAccessToken(token) {
    this.accessToken = token;
  }

  hasScopes(scopes) {
    return scopes.every(scope => this.currentScopes.includes(scope));
  }

  getAuthUrl(scopes) {
    const redir = encodeURIComponent(this.redirectURI);
    return (
      `client_id=${this.clientId}` +
      `&redirect_uri=${redir}&scope=${scopes.join(" ")}` +
      `&force_verify=${this.forceVerify ? "true" : "false"}`
    );
  }

  getAccessToken(scopes = null) {
    return new Promise((resolve, reject) => {
      scopes = normalizeScopes(scopes);

      if (!this.forceVerify && this.accessToken && this.hasScopes(scopes)) {
        resolve(this.accessToken);
        return;
      }

      const rejectError = message => {
        reject(new Error(`Twitch say: ${message}`));
        win && win.destroy();
      };

      let done = false;

      const uri = this.getAuthUrl(scopes);
      const win = createAuthWindow({
        uri,
        onError: rejectError,
        darkMode: this.darkMode
      });

      win.on("closed", () => !done && rejectError("window closed by user"));

      const req = win.webContents.session.webRequest;
      const redirectURI = fixTrailingSlash(this.redirectURI);
      const urls = [redirectURI];

      req.onBeforeRequest({ urls }, (details, callback) => {
        const url = new URL(details.url);
        const currentURI = url.origin + url.pathname;

        if (redirectURI !== currentURI) {
          callback({});
          return;
        }

        const params = url.hash
          ? qs.parse(url.hash.substr(1))
          : url.searchParams;

        if (params.error || params.access_token) {
          done = true;
          win.close();
          win.destroy();
        }

        if (params.error) {
          rejectError(params.error);
        } else if (params.access_token) {
          scopes.forEach(scope => this.currentScopes.push(scope));

          this.accessToken = new AccessToken({
            access_token: params.access_token,
            scope: this.currentScopes,
            refresh_token: ""
          });

          resolve(this.accessToken);
        }

        callback({ cancel: true });
      });
    });
  }
};
