import { v4 as uuid } from "uuid";
import animeTypes from "./anime/types";
import animeIcons from "./anime/icons";
import animeFactories from "./anime/factories";
import animeAttributes from "./anime/attributes";
import animeTransformations from "./anime/transformations";
import cloneDeep from "clone-deep";

export const pixelPerMs = 10;

function getFileExt(file) {
  return file.name.split(".").pop();
}

export function getAnimeIcon(type) {
  return animeIcons[type];
}

function getAnimeTypeFromFile(file) {
  return animeTypes[getFileExt(file)];
}

export function getAnimeAttributes(label) {
  return cloneDeep(animeAttributes[label]);
}

export function getAnimeTransformations(label) {
  return label ? cloneDeep(animeTransformations[label]) : animeTransformations;
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

export function hasSameId(a1, a2) {
  return a1 && a2 && a1.id === a2.id;
}

export function isSameAnime(a1, a2) {
  return hasSameId(a1, a2);
}

export function isSameKeyframe(a1, a2) {
  return hasSameId(a1, a2);
}

export function createKeyframe({ delay = 0, props = {} } = {}) {
  return {
    id: uuid(),
    delay,
    props: {
      duration: 1000,
      easing: "linear",
      ...props,
    },
  };
}

export function getAnimeStyle({ attributes }) {
  let style = ["max-width:none"];
  Object.entries(attributes).forEach(([label, value]) => {
    const { unit, isProp } = getAnimeAttributes(label);
    if (!isProp) style.push(`${label}:${value}${unit || ""}`);
  });
  return style.join(";");
}

export function getAnimeProps({ attributes }) {
  let props = {};
  Object.entries(attributes).forEach(([label, value]) => {
    const { unit, isProp } = getAnimeAttributes(label);
    if (isProp) props[label] = `${value}${unit || ""}`;
  });
  return props;
}

export async function getAnimeText(anime) {
  return fetch(`/public/media/texts/${anime.filename}`).then(response =>
    response.text()
  );
}
