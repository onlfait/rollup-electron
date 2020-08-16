console.log("app/renderer/windows/main/index.js");

document.addEventListener("click", async () => {
  const darkMode = await app.darkMode.toggle();
  app.titlebar.setTitle(darkMode ? "Nuit" : "Jour");
});
