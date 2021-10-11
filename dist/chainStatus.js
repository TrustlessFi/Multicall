// Copyright (c) 2020. All Rights Reserved
// SPDX-License-Identifier: UNLICENSED
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getCurrentBlockDifficulty = (multicall) => __awaiter(void 0, void 0, void 0, function* () { return yield multicall.getCurrentBlockDifficulty(); });
export const getCurrentBlockGasLimit = (multicall) => __awaiter(void 0, void 0, void 0, function* () { return yield multicall.getCurrentBlockGasLimit(); });
export const getCurrentBlockTimestamp = (multicall) => __awaiter(void 0, void 0, void 0, function* () { return yield multicall.getCurrentBlockTimestamp(); });
export const getEthBalance = (multicall, address) => __awaiter(void 0, void 0, void 0, function* () { return yield multicall.getEthBalance(address); });
export const getBlockNumber = (multicall) => __awaiter(void 0, void 0, void 0, function* () { return yield multicall.getBlockNumber(); });
export const getBlockHash = (multicall, blockNumber) => __awaiter(void 0, void 0, void 0, function* () { return yield multicall.getBlockHash(blockNumber); });
export const getLastBlockHash = (multicall) => __awaiter(void 0, void 0, void 0, function* () { return yield multicall.getLastBlockHash(); });
export const getCurrentBlockCoinbase = (multicall) => __awaiter(void 0, void 0, void 0, function* () { return yield multicall.getCurrentBlockCoinbase(); });
