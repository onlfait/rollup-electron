module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  plugins: ["svelte3"],
  extends: "eslint:recommended",
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3"
    }
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
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
    app: true,
    io: true
  }
};
