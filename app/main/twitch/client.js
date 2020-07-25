const TwitchClient = require("twitch");
const AuthProvider = require("./auth-window/AuthProvider");

let authProvider = null;
let twitchClient = null;

module.exports = (config = {}) => {
  if (!twitchClient) {
    authProvider = new AuthProvider(config);
    twitchClient = new TwitchClient({ authProvider });
  }

  return twitchClient;
};
