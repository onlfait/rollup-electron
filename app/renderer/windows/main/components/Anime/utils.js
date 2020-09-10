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
  "image": { top: 0, left: 0, width: 400, height: -1 },
  "sound": { volume: 0.8 }
};

export const animeIcons = {
  "sound": MdMusicVideo,
  "image": MdImage
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
  return { id: uuid(), props: { delay: 0, ...props } };
}
