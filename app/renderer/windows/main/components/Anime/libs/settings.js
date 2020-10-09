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

export const defaultStyles = {
  text: [
    "top",
    "left",
    "width",
    "font-size",
    "font-family",
    "font-weight",
    "color",
  ],
  image: ["top", "left", "width", "height"],
  video: ["top", "left", "width", "height"],
};

export const attrsDefs = {
  volume: {
    default: 0.8,
    input: { type: "number", min: 0, max: 1, step: 0.1 },
  },
};

export const styleDefs = {
  top: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 },
  },
  left: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 },
  },
  width: {
    default: 800,
    unit: "px",
    input: { type: "number", min: 0, step: 10 },
  },
  height: {
    default: 600,
    unit: "px",
    input: { type: "number", min: 0, step: 10 },
  },
  "font-size": {
    default: 42,
    unit: "px",
    input: { type: "number", min: 0, step: 10 },
  },
  "font-weight": {
    default: 700,
    input: { type: "number", min: 100, max: 900, step: 100 },
  },
  "font-family": {
    default: "monospace",
    input: { type: "text" },
  },
  color: {
    default: "#420042",
    input: { type: "text" },
  },
};
