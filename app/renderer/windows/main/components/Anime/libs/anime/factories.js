import * as utils from "../utils";

const visibleAttributes = {
  top: 0,
  left: 0,
  width: 350,
  height: 200,
  "z-index": 1,
  opacity: 1,
};

export default {
  async sound(filename) {
    const { duration } = await utils.getAudio(filename);
    return {
      info: { duration: Math.round(duration * 1000) },
      attributes: {
        volume: 0.8,
      },
    };
  },

  async video(filename) {
    const vid = await utils.getVideo(filename);
    return {
      info: { duration: Math.round(vid.duration * 1000) },
      attributes: {
        ...visibleAttributes,
        width: vid.videoWidth,
        height: vid.videoHeight,
        volume: 0.8,
      },
    };
  },

  async image(filename) {
    const { width, height } = await utils.getImage(filename);
    return {
      info: { width, height },
      attributes: {
        ...visibleAttributes,
        width,
        height,
      },
    };
  },

  async text() {
    return {
      attributes: {
        ...visibleAttributes,
        "font-size": 42,
        "font-weight": 400,
      },
    };
  },
};
