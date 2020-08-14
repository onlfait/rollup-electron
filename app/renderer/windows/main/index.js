console.log("renderer/windows/main/index.js");

document.addEventListener("click", () => {
  const darkMode = titlebar.getDarkMode();
  titlebar.setDarkMode(!darkMode);
  titlebar.setTitle(`${darkMode ? "Dark" : "Light"} mode`);
});
