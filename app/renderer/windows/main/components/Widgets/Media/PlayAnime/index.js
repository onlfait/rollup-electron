export { default as Settings } from "./Settings.svelte";
export { default as Widget } from "./Widget.svelte";

export const config = {
  label: "Play animation",
  name: "PlayAnime",
  group: "Media",
  action: {
    type: "immediat"
  },
  props: {
    timeline: []
  }
};
