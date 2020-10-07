import { writable } from "svelte/store";

export default function create() {
  return {
    items: writable([]),
    selectedItem: writable(null),
  };
}
