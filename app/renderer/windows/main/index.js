console.log("app/renderer/windows/main/index.js");

document.addEventListener("click", () => {
  console.log("toggleDarkMode...");
});

remote.get("app.version").then(version => console.log(version));
