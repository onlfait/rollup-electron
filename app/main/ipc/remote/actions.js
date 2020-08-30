const { start: server } = require("../../overlay");

// TODO implement queue !!!

function sendAction(name, props) {
  server().send({ type: "action", action: { name, props } });
}

module.exports = {
  push(action) {
    if (action.type === "immediat") {
      sendAction(action.name, action.props);
    }
  }
};
