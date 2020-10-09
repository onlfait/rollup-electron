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

export const defaultStyles = {
  text: ["top", "left", "width", "font-size", "color"],
  image: ["top", "left", "width", "height"],
  video: ["top", "left", "width", "height"],
};

export const defaultAttrs = {
  audio: ["volume"],
  video: ["volume"],
};

export const styleDefs = {
  top: { default: 0 },
  left: { default: 0 },
  width: { default: 800 },
  height: { default: 600 },
  "font-size": { default: 42 },
  color: { default: "#004200" },
};

export const attrsDefs = {
  volume: { default: 0.8 },
};
