"use strict";
// Copyright (c) 2020. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustlessMulticallViewOnlyArtifact = exports.TrustlessMulticallArtifact = exports.idsToNoArg = exports.idsToArg = exports.idsToIds = exports.executeWriteMulticalls = exports.executeMulticalls = exports.manyContractOneFunctionMC = exports.oneContractOneFunctionMC = exports.oneContractManyFunctionMC = void 0;
var multicall_1 = require("./multicall");
Object.defineProperty(exports, "oneContractManyFunctionMC", { enumerable: true, get: function () { return multicall_1.oneContractManyFunctionMC; } });
Object.defineProperty(exports, "oneContractOneFunctionMC", { enumerable: true, get: function () { return multicall_1.oneContractOneFunctionMC; } });
Object.defineProperty(exports, "manyContractOneFunctionMC", { enumerable: true, get: function () { return multicall_1.manyContractOneFunctionMC; } });
Object.defineProperty(exports, "executeMulticalls", { enumerable: true, get: function () { return multicall_1.executeMulticalls; } });
Object.defineProperty(exports, "executeWriteMulticalls", { enumerable: true, get: function () { return multicall_1.executeWriteMulticalls; } });
Object.defineProperty(exports, "idsToIds", { enumerable: true, get: function () { return multicall_1.idsToIds; } });
Object.defineProperty(exports, "idsToArg", { enumerable: true, get: function () { return multicall_1.idsToArg; } });
Object.defineProperty(exports, "idsToNoArg", { enumerable: true, get: function () { return multicall_1.idsToNoArg; } });
var TrustlessMulticall_json_1 = require("./artifacts/contracts/TrustlessMulticall.sol/TrustlessMulticall.json");
Object.defineProperty(exports, "TrustlessMulticallArtifact", { enumerable: true, get: function () { return __importDefault(TrustlessMulticall_json_1).default; } });
var TrustlessMulticallViewOnly_json_1 = require("./artifacts/contracts/TrustlessMulticallViewOnly.sol/TrustlessMulticallViewOnly.json");
Object.defineProperty(exports, "TrustlessMulticallViewOnlyArtifact", { enumerable: true, get: function () { return __importDefault(TrustlessMulticallViewOnly_json_1).default; } });
