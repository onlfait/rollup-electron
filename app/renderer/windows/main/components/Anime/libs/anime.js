import { v4 as uuid } from "uuid";
import animeTypes from "./animeTypes";
import animeFactories from "./animeFactories";

function getFileExt(file) {
  return file.name.split(".").pop();
}

function getAnimeTypeFromFile(file) {
  return animeTypes[getFileExt(file)];
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
