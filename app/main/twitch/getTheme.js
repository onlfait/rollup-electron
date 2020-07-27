module.exports = function getThemeJS(darkMode) {
  const add = darkMode ? "dark" : "light";
  const remove = darkMode ? "light" : "dark";

  return `
    const html = document.querySelector('html');

    html.classList.remove('theme--${remove}');
    html.classList.remove('tw-root--theme-${remove}');
    html.classList.add('theme--${add}');
    html.classList.add('tw-root--theme-${add}');
  `;
};
