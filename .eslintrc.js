module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    indent: ["error", 2],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "linebreak-style": ["error", "unix"]
  }
};
