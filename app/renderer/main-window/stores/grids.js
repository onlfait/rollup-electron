import { writable } from "svelte/store";

export const grids = writable({}, async set => {
  set(await remote.getAllGrids());
});
