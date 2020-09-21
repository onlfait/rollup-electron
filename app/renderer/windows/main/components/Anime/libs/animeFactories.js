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
    const { duration } = await utils.getVideo(filename);
    return {
      info: { duration: Math.round(duration * 1000) },
      attributes: { volume: 0.8 },
    };
  },

  async image(filename) {
    const { width, height } = await utils.getImage(filename);
    return {
      info: { width, height },
      attributes: { top: 0, left: 0, width, height },
    };
  },

  async text() {
    return { attributes: { fontSize: 42, fontWeight: 400 } };
  },
};
