// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import './TrustlessMulticall.sol';


contract TrustlessMulticallViewOnly {

    function read(
        TrustlessMulticall.ReadCall[] calldata calls
    ) external view virtual returns (
        uint256 blockNumber,
        TrustlessMulticall.ReadResult[] memory results
    ) {}

    function getCurrentBlockDifficulty() external view returns (uint256 blockDifficulty) {}
    function getCurrentBlockGasLimit() external view returns (uint256 blockGasLimit) {}
    function getCurrentBlockTimestamp() external view returns (uint256 blockTimestamp) {}
    function getEthBalance(address addr) external view returns (uint256 ethBalances) {}
    function getBlockNumber() external view returns (uint256 blockNumber) {}
    function getBlockHash(uint256 blockNumber) external view returns (bytes32 blockHash) {}
    function getLastBlockHash() external view returns (bytes32 blockHash) {}
    function getCurrentBlockCoinbase() external view returns (address blockCoinbase) {}
    function getChainId() external view returns (uint chainId) {}
}