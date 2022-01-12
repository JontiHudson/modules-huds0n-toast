"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToast = exports.Toast = void 0;
const createToast_1 = require("./createToast");
Object.defineProperty(exports, "createToast", { enumerable: true, get: function () { return createToast_1.createToast; } });
const presets_1 = require("./presets");
exports.Toast = (0, createToast_1.createToast)(presets_1.defaultPresets);
