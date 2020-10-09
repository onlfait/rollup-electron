import { writable } from "svelte/store";

export default function create() {
  return {
    items: writable([]),
    selectedItem: writable(null),
    timeline: {
      left: writable(0),
      scale: writable(1),
    },
  };
}
