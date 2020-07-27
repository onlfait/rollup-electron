module.exports = function getThemeJS(darkMode) {
  return `
    function setDarkMode(enabled = true) {
      const $html = document.querySelector('html');
      $html.classList.toggle('theme--dark', enabled);
      $html.classList.toggle('theme--light', !enabled);
      $html.classList.toggle('tw-root--theme-dark', enabled);
      $html.classList.toggle('tw-root--theme-light', !enabled);
    }

    setDarkMode(${darkMode ? "true" : "false"})
  `;
};
