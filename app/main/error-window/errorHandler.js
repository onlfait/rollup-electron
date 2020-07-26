const { name } = require("../../package");

let errorLogs = [];

function createElement(type, className, text = null) {
  const el = document.createElement(type);
  el.classList.add(className);
  text && (el.innerText = text);
  return el;
}

function notify(error) {
  const title = `${name} > ${error.origin}`;
  const body = `${error.name}: ${error.message}`;
  new Notification(title, { body });
}

module.exports = {
  errorLogs,
  onError(event, error) {
    const message = `${error.name}: ${error.message}`;
    const $errors = document.querySelector("#errors");
    const $error = createElement("div", "error");
    const $message = createElement("p", "message", message);
    const $stack = createElement("pre", "stack", error.stack);

    $error.appendChild($message);
    $error.appendChild($stack);
    $errors.appendChild($error);

    errorLogs.push(error);
    notify(error);
  }
};
