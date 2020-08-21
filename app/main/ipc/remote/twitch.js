const twitchClient = require("../../twitch/client")();
const openChatWindow = require("../../windows/twitch-chat/create");

module.exports = {
  getMe(email = true) {
    return twitchClient.helix.users.getMe(email);
  },
  openChatWindow({ channel } = {}) {
    openChatWindow({ channel });
  }
};
