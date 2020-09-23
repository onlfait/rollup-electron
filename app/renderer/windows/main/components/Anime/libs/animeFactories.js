import * as utils from "./utils";

export default {
  async sound(filename) {
    const { duration } = await utils.getAudio(filename);
    return {
      info: { duration: Math.round(duration * 1000) },
      attributes: { volume: 0.8 },
    };
  },

  async video(filename) {
    const { videoWidth, videoHeight, duration } = await utils.getVideo(
      filename
    );
    return {
      info: { duration: Math.round(duration * 1000) },
      attributes: {
        top: 0,
        left: 0,
        width: videoWidth,
        height: videoHeight,
        volume: 0.8,
        "z-index": 1,
      },
    };
  },

  async image(filename) {
    const { width, height } = await utils.getImage(filename);
    return {
      info: { width, height },
      attributes: { top: 0, left: 0, width, height, "z-index": 1 },
    };
  },

  async text() {
    return {
      attributes: {
        top: 0,
        left: 0,
        width: 400,
        height: 250,
        "font-size": 42,
        "font-weight": 400,
        "z-index": 1,
      },
    };
  },
};
