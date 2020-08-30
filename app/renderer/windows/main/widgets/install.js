import { install } from "./index";
import * as widgets from "./all";

Object.values(widgets).forEach(install);
