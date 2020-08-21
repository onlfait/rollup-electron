const twitchClient = require("../../twitch/client")();

module.exports = {
  getMe(email = true) {
    return twitchClient.helix.users.getMe(email);
  }
};
