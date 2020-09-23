import { v4 as uuid } from "uuid";
import animeTypes from "./animeTypes";
import animeIcons from "./animeIcons";
import animeFactories from "./animeFactories";
import animeAttributes from "./animeAttributes";

function getFileExt(file) {
  return file.name.split(".").pop();
}

export function getAnimeIcon(type) {
  return animeIcons[type];
}

function getAnimeTypeFromFile(file) {
  return animeTypes[getFileExt(file)];
}

export function getAnimeAttributes(label, attributes = {}) {
  return { ...animeAttributes[label], ...attributes };
}

async function createAnime(type, filename) {
  return {
    id: uuid(),
    type,
    filename,
    info: {},
    attributes: {},
    keyframes: [],
    ...(await animeFactories[type](filename)),
  };
}

export function createAnimeFromFile(file) {
  return new Promise((resolve, reject) => {
    const type = getAnimeTypeFromFile(file);

    if (!type) {
      return reject(new Error(`Unsupported file type "${file.name}"`));
    }

    app.remote
      .call(`upload.${type}`, file.path)
      .then(async filename => resolve(createAnime(type, filename)))
      .catch(reject);
  });
}

export function isSameAnime(a1, a2) {
  return a1 && a2 && a1.id === a2.id;
}
