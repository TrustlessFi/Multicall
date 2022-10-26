"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustlessMulticallWrite__factory = exports.TrustlessMulticallViewOnly__factory = exports.TrustlessMulticallRead__factory = exports.TrustlessMulticall__factory = exports.SimpleViewContract__factory = exports.factories = void 0;
exports.factories = __importStar(require("./factories"));
var SimpleViewContract__factory_1 = require("./factories/test/SimpleViewContract__factory");
Object.defineProperty(exports, "SimpleViewContract__factory", { enumerable: true, get: function () { return SimpleViewContract__factory_1.SimpleViewContract__factory; } });
var TrustlessMulticall__factory_1 = require("./factories/TrustlessMulticall__factory");
Object.defineProperty(exports, "TrustlessMulticall__factory", { enumerable: true, get: function () { return TrustlessMulticall__factory_1.TrustlessMulticall__factory; } });
var TrustlessMulticallRead__factory_1 = require("./factories/TrustlessMulticallRead__factory");
Object.defineProperty(exports, "TrustlessMulticallRead__factory", { enumerable: true, get: function () { return TrustlessMulticallRead__factory_1.TrustlessMulticallRead__factory; } });
var TrustlessMulticallViewOnly__factory_1 = require("./factories/TrustlessMulticallViewOnly__factory");
Object.defineProperty(exports, "TrustlessMulticallViewOnly__factory", { enumerable: true, get: function () { return TrustlessMulticallViewOnly__factory_1.TrustlessMulticallViewOnly__factory; } });
var TrustlessMulticallWrite__factory_1 = require("./factories/TrustlessMulticallWrite__factory");
Object.defineProperty(exports, "TrustlessMulticallWrite__factory", { enumerable: true, get: function () { return TrustlessMulticallWrite__factory_1.TrustlessMulticallWrite__factory; } });
