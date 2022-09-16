"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@typechain/hardhat");
require("@nomiclabs/hardhat-ethers");
const config = {
    solidity: '0.8.17',
    typechain: {
        outDir: 'src/types',
        target: 'ethers-v5'
    }
};
exports.default = config;
