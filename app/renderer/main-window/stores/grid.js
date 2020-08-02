import { writable } from "svelte/store";
import { debounce } from "throttle-debounce";

export const editGrid = writable(false);
export const editItem = writable(false);
export const items = writable([]);

const saveGridItems = debounce(500, remote.saveGridItems);

// sync main <-> renderer store
remote.getGridItems().then(items.set);
items.subscribe(saveGridItems);
