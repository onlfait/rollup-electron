import { writable } from "svelte/store";

export const darkMode = writable(true);
export const language = writable("en");
export const languages = writable(["en", "fr"]);

// sync main <-> renderer store
app.darkMode.get().then(darkMode.set);
darkMode.subscribe(app.darkMode.set);

app.language.get().then(language.set);
language.subscribe(app.language.set);
