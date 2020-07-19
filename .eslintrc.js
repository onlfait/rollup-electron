module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    indent: ["error", 2],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "linebreak-style": ["error", "unix"]
  },
  globals: {
    __APP_HOST__: true
  }
};
