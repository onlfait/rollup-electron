import { writable } from "svelte/store";

export const grids = writable(null, async set => {
  set(await remote.getAllGrids());
});
