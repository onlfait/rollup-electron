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

export const animeIcons = {
  "sound": MdMusicVideo,
  "image": MdImage
};

export const animeAttrs = {
  "image": { top: 0, left: 0, width: 400, height: 400 },
  "sound": { volume: 0.8 }
};

export const soundProps = {
  "volume": { min: 0, step: 1, removable: true },
  "delay": { min: 0, step: 100, removable: false },
};

export const transformProps = {
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
  "delay": { min: 0, step: 100, removable: false },
  "duration": { min: 0, step: 100, removable: false },
};

export function hasSameId(a, b) {
  return a.id && b.id && a.id === b.id;
}

export function getFileExt(file) {
  return file.name.split(".").pop();
}

export function animeFactory(target) {
  return { id: uuid(), target, keyframes: [] };
}

export function keyframeFactory(props) {
  return { id: uuid(), props: { delay: 0, duration: 1000, ...props } };
}
