const { name, version, repository } = require("../../../package");
const { shell, ipcRenderer } = require("electron");
const EventEmitter = require("events");

const errors = [];
const events = new EventEmitter();

const api = {
  getAll: () => errors,
  on: (...args) => events.on(...args),
  openIssue: () => shell.openExternal(createIssue(errors))
};

function addError(error) {
  errors.push(error);
  events.emit("errors", errors);
}

function createIssue(errors) {
  const path = repository.split(":")[1];
  const url = new URL(`https://github.com/${path}/issues/new`);
  const title = [];
  const body = [
    "## Bug reports",
    "Please replace this line with a brief summary of your issue.",
    "",
    "## Steps to Reproduce the Problem",
    "1 ...",
    "2 ...",
    "3 ...",
    ""
  ];

  errors.forEach(error => {
    title.push(error.message);
    body.push(
      `## > ${error.message}`,
      `**name:** ${error.name}`,
      `**origin:** ${error.origin}`,
      `\`\`\`\n${error.stack}\n\`\`\``,
      "\n---\n"
    );
  });

  body.push(
    "## Specifications",
    `**${name}:** v${version}`,
    `**electron:** v${process.versions.electron}`,
    `**chrome:** v${process.versions.chrome}`,
    `**node:** v${process.versions.node}`,
    `**platform:** ${process.platform}`
  );

  url.searchParams.set("title", title.join(" & "));
  url.searchParams.set("body", body.join("\n"));

  return url.toString();
}

ipcRenderer.on("app.uncaughtError", (event, error) => addError(error));

module.exports = { api };
