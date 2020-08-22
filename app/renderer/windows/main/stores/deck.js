import { writable } from "svelte/store";

export const panels = writable([]);
export const editMode = writable(false);
export const currentPanelId = writable(null);

// sync main <-> renderer store
app.deck.panels.get().then(panels.set);
panels.subscribe(app.deck.panels.set);

app.deck.currentPanelId.get().then(currentPanelId.set);
currentPanelId.subscribe(app.deck.currentPanelId.set);
