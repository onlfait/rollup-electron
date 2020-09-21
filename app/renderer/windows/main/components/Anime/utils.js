import cloneDeep from "clone-deep";
import mergeDeep from "deepmerge";
import { v4 as uuid } from "uuid";

import MdImage from "svelte-icons/md/MdImage.svelte";
import MdMusicVideo from "svelte-icons/md/MdMusicVideo.svelte";

export const pixelPerMs = 10;

export const animeTypes = {
  "ico": "image",
  "gif": "image",
  "png": "image",
  "jpg": "image",
  "jpeg": "image",
  "mp3": "sound",
  "ogg": "sound"
};

export const animeAttrs = {
  "image": { top: 0, left: 0, width: 400, height: 400, "z-index": 1 },
  "sound": { volume: 0.8 }
};

export const animeProps = {
  "top": { step: 10, removable: false },
  "left": { step: 10, removable: false },
  "width": { min: 0, step: 10, removable: false },
  "height": { min: 0, step: 10, removable: false },
  "volume": { min: 0, step: 0.1, removable: false },
  "z-index": { min: 0, step: 1, removable: false },
  "duration": { removable: false, disabled: true },
};

export const animeIcons = {
  "sound": MdMusicVideo,
  "image": MdImage
};

export const soundProps = {
  "duration": { min: 0, step: 100, removable: false },
  "volume": { min: 0, step: 0.1, removable: true },
  "easing": { type: "text" },
};

export const transformProps = {
  "duration": { min: 0, step: 100, removable: false },
  "translateX": { step: 10, removable: true },
  "translateY": { step: 10, removable: true },
  "translateZ": { step: 10, removable: true },
  "rotate": { step: 5, removable: true },
  "rotateX": { step: 5, removable: true },
  "rotateY": { step: 5, removable: true },
  "rotateZ": { step: 5, removable: true },
  "scale": { step: 0.1, removable: true },
  "scaleX": { step: 0.1, removable: true },
  "scaleY": { step: 0.1, removable: true },
  "scaleZ": { step: 0.1, removable: true },
  "skew": { step: 1, removable: true },
  "skewX": { step: 1, removable: true },
  "skewY": { step: 1, removable: true },
  "perspective": { step: 1, removable: true },
};

export function getInputProps(type) {
  return type === "sound" ? soundProps : transformProps;
}

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
    img.onerror = reject;
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.src = `/public/media/images/${src}`;
  });
}

export function getSoundDuration(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.onerror = reject;
    audio.onloadedmetadata = () => resolve(audio.duration);
    audio.src = `/public/media/sounds/${src}`;
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
        if (type === "sound") {
          attrs.duration = await getSoundDuration(file.name) * 1000;
        }
        resolve({ id: uuid(), type, name: filename, attrs, keyframes: [] });
      })
      .catch(reject);
  });
}

export function createKeyframe(delay, props) {
  return {
    id: uuid(),
    delay,
    props: {
      duration: 1000,
      easing: "linear",
      ...props
    }
  };
}
