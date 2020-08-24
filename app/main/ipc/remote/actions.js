const { start } = require("../../overlay");

module.exports = {
  playSound(args) {
    start().send({
      type: "action",
      data: { name: "playSound", args }
    });
  },
  showPicture(args) {
    start().send({
      type: "action",
      data: { name: "showPicture", args }
    });
  }
};
