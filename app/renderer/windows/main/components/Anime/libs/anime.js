import { v4 as uuid } from "uuid";
import types from "./anime/types";
import icons from "./anime/icons";
import * as utils from "./utils";

const attributes = {
  text: ["top", "left", "width", "font-size", "color"],
  audio: ["volume"],
  image: ["top", "left", "width", "height"],
  video: ["top", "left", "width", "height", "volume"],
};

const attributesDefs = {
  top: { props: { type: "number", value: 0 }, unit: "px", isProp: false },
  left: { props: { type: "number", value: 0 }, unit: "px", isProp: false },
  width: { props: { type: "number", value: 800 }, unit: "px", isProp: false },
  height: { props: { type: "number", value: 600 }, unit: "px", isProp: false },
  volume: { props: { type: "number", value: 0.8 }, unit: null, isProp: true },
  "font-size": {
    props: { type: "number", value: 42 },
    unit: "px",
    isProp: false,
  },
  color: {
    props: { type: "string", value: "#555425" },
    unit: null,
    isProp: false,
  },
};

export function getAnimeIcon(type) {
  return icons[type];
}

function getAnimeTypeFromExt(ext) {
  const type = types[ext];
  if (!type) {
    throw new Error(`Undefined anime ext. "${ext}"`);
  }
  return types[ext];
}

function uploadFile(type, file) {
  return app.remote.call(`upload.${type}`, file.path);
}

export async function createElementFromTarget(target) {
  const factory = utils.factories[target.type];
  if (!factory) {
    throw new Error(`Undefined anime type "${target.type}"`);
  }
  return await factory(target.name);
}

async function getTargetData(target) {
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

async function getTargetAttrs({ type, info }) {
  const attrs = {};
  attributes[type].forEach(key => {
    attrs[key] = info[key] || attributesDefs[key].props.value;
  });
  return attrs;
}

export function getPropsFromAttrs(attrs) {
  const props = {};
  Object.entries(attrs).forEach(([key, value]) => {
    if (!attributesDefs[key].isProp) return;
    const unit = attributesDefs[key].unit || "";
    props[key] = `${value}${unit}`;
  });
  return props;
}

export function getStyleFromAttrs(attrs) {
  const style = ["max-width:none"];
  Object.entries(attrs).map(([key, value]) => {
    if (attributesDefs[key].isProp) return;
    const unit = attributesDefs[key].unit || "";
    style.push(`${key}:${value}${unit}`);
  });
  return style.join(";");
}

async function createTargetFromFile(file) {
  const ext = utils.getFileExt(file);
  const type = getAnimeTypeFromExt(ext);
  const name = await uploadFile(type, file);
  const info = await getTargetData({ type, name });
  const attrs = await getTargetAttrs({ type, info });
  return { type, name, info, attrs };
}

export async function createItemFromFile(file) {
  if (!file.size) {
    throw new Error(`Empty file "${file.name}"`);
  }
  return {
    id: uuid(),
    type: "file",
    target: await createTargetFromFile(file),
    delay: 0,
  };
}
