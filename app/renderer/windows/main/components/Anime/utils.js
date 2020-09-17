import cloneDeep from "clone-deep";
import mergeDeep from "deepmerge";
import { v4 as uuid } from "uuid";

import MdImage from "svelte-icons/md/MdImage.svelte";
import MdMusicVideo from "svelte-icons/md/MdMusicVideo.svelte";

const animeTypes = {
  "ico": "image",
  "gif": "image",
  "png": "image",
  "jpg": "image",
  "jpeg": "image",
  "mp3": "sound",
  "ogg": "sound"
};

const animeAttrs = {
  "image": { top: 0, left: 0, width: 400, height: 400, "z-index": 1 },
  "sound": { volume: 0.8 }
};

export const animeIcons = {
  "sound": MdMusicVideo,
  "image": MdImage
};

export function getFileExt(file) {
  return file.name.split(".").pop();
}

export function getAnimeType(file) {
  return animeTypes[getFileExt(file)];
}

export function getAnimeIcon(type) {
  return animeIcons[type];
}

export async function getAnimeAttrs(type, filename = null) {
  let attrs = cloneDeep(animeAttrs[type] || {});
  if (filename && type === "image") {
    attrs = mergeDeep(attrs, await getImageSize(filename));
  }
  return attrs;
}

export function getImageSize(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = `/public/media/images/${src}`;
  });
}

export function createAnimeFile(file) {
  return new Promise((resolve, reject) => {
    const type = getAnimeType(file);

    if (!type) {
      reject(new Error("Unsupported file type"));
      return;
    }

    app.remote.call(`upload.${type}`, file.path)
      .then(async filename => {
        const attrs = await getAnimeAttrs(type, filename);
        resolve({ id: uuid(), type, name: filename, attrs });
      })
      .catch(reject);
  });
}
