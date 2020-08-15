console.log("renderer/windows/main/index.js");

document.addEventListener("click", () => {
  let darkMode = titlebar.toggleDarkMode();
  titlebar.setTitle(`${darkMode ? "Dark" : "Light"} mode`);
});

remote.get("app.version").then(version => console.log(version));
