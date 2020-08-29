import App from "./App.svelte";
import i18n from "../../i18n";
import "./stores/app";

import "./widgets/install";

app.whenReady(() => {
  app.language.get().then(language => {
    i18n.changeLanguage(language);
    new App({ target: document.body });
  });
});
