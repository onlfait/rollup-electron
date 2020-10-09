import { v4 as uuid } from "uuid";
import { elementFactories } from "./utils";

const types = {
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

const defaultStyles = {
  text: ["top", "left", "width", "font-size", "color"],
  image: ["top", "left", "width", "height"],
  video: ["top", "left", "width", "height"],
};

const defaultAttrs = {
  audio: ["volume"],
  video: ["volume"],
};

const styleDefs = {
  top: { default: 0 },
  left: { default: 0 },
  width: { default: 800 },
  height: { default: 600 },
  "font-size": { default: 42 },
  color: { default: "#004200" },
};

const attrsDefs = {
  volume: { default: 0.8 },
};

function getTypeFromExt(ext) {
  const type = types[ext];

  if (!type) {
    throw new Error(`Undefined ext. "${ext}"`);
  }

  return types[ext];
}

function uploadFile(type, file) {
  return app.remote.call(`upload.${type}`, file.path);
}

async function createElementFromTarget(target) {
  const factory = elementFactories[target.type];

  if (!factory) {
    throw new Error(`Undefined type "${target.type}"`);
  }

  return await factory(target.name);
}

async function getTargetInfo(target) {
  const element = await createElementFromTarget(target);
  const info = {};

  if (target.type === "image") {
    info.width = element.width;
    info.height = element.height;
  } else if (target.type === "video") {
    info.width = element.videoWidth;
    info.height = element.videoHeight;
  }

  if (target.type === "audio" || target.type === "video") {
    info.duration = Math.round(element.duration * 1000);
  }

  return info;
}

function getTargetStyle({ type, info }) {
  const names = defaultStyles[type] || [];
  const style = {};

  names.forEach(key => {
    const { default: value } = styleDefs[key];
    style[key] = info[key] || value;
  });

  return style;
}

function getTargetAttrs({ type, info }) {
  const names = defaultAttrs[type] || [];
  const attrs = {};

  names.forEach(key => {
    const { default: value } = attrsDefs[key];
    attrs[key] = info[key] || value;
  });

  return attrs;
}

async function createTargetFromFile(file) {
  const ext = file.name.split(".").pop();
  const type = getTypeFromExt(ext);
  const name = await uploadFile(type, file);
  const info = await getTargetInfo({ type, name });
  const style = getTargetStyle({ type, info });
  const attrs = getTargetAttrs({ type, info });

  return { type, name, info, style, attrs };
}

export default async function createItemFromFile(file) {
  if (!file.size) {
    throw new Error(`Empty file "${file.name}"`);
  }

  return {
    id: uuid(),
    type: "file",
    target: await createTargetFromFile(file),
    keyframes: [],
    delay: 0,
  };
}
