export { default as Settings } from "./Settings.svelte";
export { default as Widget } from "./Widget.svelte";

export const config = {
  label: "Show picture",
  name: "ShowPicture",
  group: "Media",
  action: {
    type: "immediat"
  },
  props: {
    file: null,
    top: 0,
    left: 0,
    width: 442,
    height: -1,
    delay: 0,
    duration: 5000,
    anime: {
      translateX: 500
    }
  }
};
