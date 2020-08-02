import { writable } from "svelte/store";

export const panels = writable([]);
export const currentId = writable(null);

// sync main <-> renderer store
remote.getPanels().then(panels.set);
panels.subscribe(remote.savePanels);

remote.getCurrentPanelId().then(currentId.set);
currentId.subscribe(remote.setCurrentPanelId);
