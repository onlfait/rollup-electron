import { writable } from "svelte/store";

export const darkMode = writable(true);

// sync main <-> renderer store
app.darkMode.get().then(darkMode.set);
darkMode.subscribe(app.darkMode.set);
