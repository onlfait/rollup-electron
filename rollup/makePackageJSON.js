const fs = require("fs-extra");

module.exports = async function makePackageJSON({ from, to }) {
  const pkg = await fs.readJson(from);
  await fs.writeJson(
    to,
    {
      license: pkg.license,
      version: pkg.version,
      name: pkg.name,
      description: pkg.description,
      author: pkg.author,
      repository: pkg.repository,
      main: "main/index.js",
      appConfig: {
        name: pkg.build.productName,
        icon: pkg.build.icon.replace(/^app\//, "")
      },
      dependencies: pkg.dependencies
    },
    { spaces: 2 }
  );
};
