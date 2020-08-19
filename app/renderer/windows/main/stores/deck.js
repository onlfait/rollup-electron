import { writable } from "svelte/store";

export const panels = writable([]);
export const editMode = writable(false);
export const currentId = writable(null);

// sync main <-> renderer store
app.deck.panels.get().then(panels.set);
panels.subscribe(app.deck.panels.set);

app.deck.currentId.get().then(currentId.set);
currentId.subscribe(app.deck.currentId.set);
