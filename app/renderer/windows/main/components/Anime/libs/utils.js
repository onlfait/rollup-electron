const mediaPath = "/public/media";

export function getImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = reject;
    img.onload = () => resolve(img);
    img.src = `${mediaPath}/images/${src}`;
  });
}

export function getMedia(type, src) {
  return new Promise((resolve, reject) => {
    const media = document.createElement(type);
    media.onerror = reject;
    media.onloadedmetadata = () => resolve(media);
    media.src = `${mediaPath}/${src}`;
  });
}

export function getAudio(src) {
  return getMedia("audio", `sounds/${src}`);
}

export function getVideo(src) {
  return getMedia("video", `videos/${src}`);
}
