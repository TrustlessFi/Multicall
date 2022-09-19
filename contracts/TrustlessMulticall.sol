// Copyright (c) 2020-2022. All Rights Reserved
// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;


contract TrustlessMulticall {
    struct ReadCall { 
        address target; 
        bytes callData; 
    }
    struct WriteCall { 
        address target; 
        bytes callData; 
        uint256 value;
    }

    struct ReadResult { 
        bool success; 
        bytes returnData; 
    }

    function multicallNoRevertOnError(ReadCall[] calldata calls) external returns (
        uint256 blockNumber,
        ReadResult[] memory results
    ) {
        results = new ReadResult[](calls.length);

        for(uint256 i = 0; i < calls.length; i++) {
            (results[i].success, results[i].returnData) = calls[i].target.call(calls[i].callData);
        }

        return (block.number, results);
    }

    function multicallRevertOnError(WriteCall[] calldata calls) external payable returns (
        bytes[] memory results
    ) {
        WriteCall memory call;
        results = new bytes[](calls.length);

        for(uint256 i = 0; i < calls.length; i++) {
            call = calls[i];
            (bool success, bytes memory result) = 
                call.value > 0
                    ? payable(call.target).call{value: call.value}(call.callData)
                    : call.target.call(call.callData);

            if (!success) {
                // Next 6 lines from https://ethereum.stackexchange.com/a/83577
                if (result.length < 68) revert();
                assembly {
                    result := add(result, 0x04)
                }
                // All that remains is the revert string
                revert(abi.decode(result, (string))); 
            }

            results[i] = result;
        }

        return results;
    }

    function getCurrentBlockDifficulty() external view returns (uint256) {
        return block.difficulty;
    }

    function getCurrentBlockGasLimit() external view returns (uint256) {
        return block.gaslimit;
    }

    function getCurrentBlockTimestamp() external view returns (uint256) {
         return block.timestamp;
    }

    function getEthBalance(address addr) external view returns (uint256) {
        return addr.balance;
    }

    function getBlockNumber() external view returns (uint256) {
        return block.number;
    }

    function getBlockHash(uint256 blockNumber) external view returns (bytes32) {
        return blockhash(blockNumber);
    }

    function getLastBlockHash() external view returns (bytes32) {
        return blockhash(block.number - 1);
    }

    function getCurrentBlockCoinbase() external view returns (address) {
        return block.coinbase;
    }

    function getChainId() external view returns (uint) {
        return block.chainid;
    }
}