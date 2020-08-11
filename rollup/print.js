const chalk = require("chalk");

function fn(color) {
  return color[0] === "#" ? chalk.hex(color) : chalk.keyword(color);
}

function print({ label, color }, ...args) {
  // eslint-disable-next-line
  console.log(fn(color)(`[${label}]`), ...args);
}

module.exports = (label, colors = {}) => {
  return {
    log: print.bind(null, { label, color: colors.log || "white" }),
    info: print.bind(null, { label, color: colors.info || "cyan" }),
    warn: print.bind(null, { label, color: colors.warn || "yellow" }),
    error: print.bind(null, { label, color: colors.error || "red" })
  };
};
