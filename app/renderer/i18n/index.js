import i18next from "i18next";
import en from "./languages/en";
import fr from "./languages/fr";

i18next.init({
  lng: "fr",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    fr: { translation: fr }
  }
});

export const _ = (...args) => i18next.t(...args);
export default i18next;
