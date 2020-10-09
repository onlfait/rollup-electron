export const extTypes = {
  txt: "text",
  ico: "image",
  gif: "image",
  png: "image",
  jpg: "image",
  jpeg: "image",
  mp3: "audio",
  ogg: "audio",
  mp4: "video",
  ogv: "video",
};

export const defaultAttrs = {
  audio: ["volume"],
  video: ["volume"],
};

export const attrsDefs = {
  volume: { default: 0.8 },
};

export const defaultStyles = {
  text: ["top", "left", "width", "font-size", "color"],
  image: ["top", "left", "width", "height"],
  video: ["top", "left", "width", "height"],
};

export const styleDefs = {
  top: { default: 0, unit: "px" },
  left: { default: 0, unit: "px" },
  width: { default: 800, unit: "px" },
  height: { default: 600, unit: "px" },
  "font-size": { default: 42, unit: "px" },
  color: { default: "#004200" },
};
