import { v4 as uuid } from "uuid";
import types from "./anime/types";
import icons from "./anime/icons";
import * as utils from "./utils";

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
  const data = {};
  if (target.type === "image") {
    data.width = element.width;
    data.height = element.height;
  } else if (target.type === "video") {
    data.width = element.videoWidth;
    data.height = element.videoHeight;
  }
  if (target.type === "audio" || target.type === "video") {
    data.duration = Math.round(element.duration * 1000);
  }
  return data;
}

async function createTargetFromFile(file) {
  const ext = utils.getFileExt(file);
  const type = getAnimeTypeFromExt(ext);
  const name = await uploadFile(type, file);
  const data = await getTargetData({ type, name });
  return { type, name, data };
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
