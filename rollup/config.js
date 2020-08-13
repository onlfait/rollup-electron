import commonsConfig from "./commons.config";
import windowsConfig from "./windows.config";

module.exports = [...commonsConfig(), ...windowsConfig()];
